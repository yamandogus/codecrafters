import { Injectable, NotFoundException, ForbiddenException } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import type { CreateForumDto } from "./dto/create-forum.dto"
import type { UpdateForumDto } from "./dto/update-forum.dto"
import { ForumCategory } from "@prisma/client"

@Injectable()
export class ForumsService {
  constructor(private prisma: PrismaService) {}

  async create(authorId: string, createForumDto: CreateForumDto) {
    return this.prisma.forumPost.create({
      data: {
        title: createForumDto.title,
        content: createForumDto.description,
        category: ForumCategory.OTHER,
        userId: authorId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true,
          },
        },
      },
    })
  }

  async findAll(query: { page?: number; limit?: number; category?: string; search?: string } = {}) {
    const { page = 1, limit = 10, category, search } = query

    const skip = (page - 1) * limit
    // Use type inference - Prisma will validate the type when passed to the query
    const where: Record<string, unknown> = {
      isActive: true,
    }

    if (category) where.category = category as ForumCategory
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { content: { contains: search, mode: "insensitive" } },
      ]
    }

    const [forums, total] = await Promise.all([
      this.prisma.forumPost.findMany({
        where,
        skip,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              username: true,
              name: true,
              avatar: true,
            },
          },
          _count: {
            select: {
              comments: true,
            },
          },
        },
        orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
      }),
      this.prisma.forumPost.count({ where }),
    ])

    return {
      forums,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    }
  }

  async findOne(id: string) {
    const forum = await this.prisma.forumPost.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true,
            bio: true,
          },
        },
        comments: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                name: true,
                avatar: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    })

    if (!forum) {
      throw new NotFoundException("Forum not found")
    }

    // Increment view count
    await this.prisma.forumPost.update({
      where: { id },
      data: { views: { increment: 1 } },
    })

    return forum
  }

  async update(id: string, userId: string, updateForumDto: UpdateForumDto) {
    const forum = await this.prisma.forumPost.findUnique({
      where: { id },
    })

    if (!forum) {
      throw new NotFoundException("Forum not found")
    }

    if (forum.userId !== userId) {
      throw new ForbiddenException("You can only update your own forums")
    }

    return this.prisma.forumPost.update({
      where: { id },
      data: {
        title: updateForumDto.title,
        content: updateForumDto.description,
        isPinned: updateForumDto.isPinned,
        isLocked: updateForumDto.isLocked,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true,
          },
        },
      },
    })
  }

  async remove(id: string, userId: string) {
    const forum = await this.prisma.forumPost.findUnique({
      where: { id },
    })

    if (!forum) {
      throw new NotFoundException("Forum not found")
    }

    if (forum.userId !== userId) {
      throw new ForbiddenException("You can only delete your own forums")
    }

    await this.prisma.forumPost.delete({
      where: { id },
    })

    return { message: "Forum deleted successfully" }
  }

  async findBySlug(slug: string) {
    // Since there's no slug field in schema, we'll use id instead
    // If slug is actually needed, it should be added to the schema
    return this.findOne(slug)
  }

  async incrementView(slug: string) {
    // Since there's no slug field in schema, we'll use id instead
    const forum = await this.prisma.forumPost.findUnique({
      where: { id: slug },
    })

    if (!forum) {
      throw new NotFoundException("Forum not found")
    }

    await this.prisma.forumPost.update({
      where: { id: slug },
      data: { views: { increment: 1 } },
    })

    return { message: "View count incremented" }
  }
}
