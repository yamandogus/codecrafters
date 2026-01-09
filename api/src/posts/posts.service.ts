import { Injectable, NotFoundException, ForbiddenException } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import type { CreatePostDto } from "./dto/create-post.dto"
import type { UpdatePostDto } from "./dto/update-post.dto"
import { BlogCategory } from "@prisma/client"

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(authorId: string, createPostDto: CreatePostDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: authorId },
      select: { name: true, username: true },
    })

    const post = await this.prisma.blogPost.create({
      data: {
        title: createPostDto.title,
        content: createPostDto.content,
        excerpt: createPostDto.excerpt || "",
        author: user ? `${user.name} (@${user.username})` : "",
        category: BlogCategory.OTHER,
        image: createPostDto.coverImage,
        isPublished: createPostDto.published || false,
        tags: [],
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

    // Increment user's posts count
    await this.prisma.user.update({
      where: { id: authorId },
      data: { posts: { increment: 1 } },
    })

    return post
  }

  async findAll(query?: { page?: number; limit?: number; category?: string; search?: string; published?: boolean | string }) {
    const queryParams = query || {}
    const { page = 1, limit = 10, category, search, published = true } = queryParams

    const skip = (page - 1) * limit
    // Use type inference - Prisma will validate the type when passed to the query
    const where: Record<string, unknown> = {}

    if (published !== undefined) {
      where.isPublished = published === "true" || published === true
    }
    if (category) where.category = category as BlogCategory
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { content: { contains: search, mode: "insensitive" } },
        { excerpt: { contains: search, mode: "insensitive" } },
      ]
    }

    const [posts, total] = await Promise.all([
      this.prisma.blogPost.findMany({
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
        orderBy: {
          createdAt: "desc",
        },
      }),
      this.prisma.blogPost.count({ where }),
    ])

    return {
      posts,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    }
  }

  async findOne(id: string) {
    const post = await this.prisma.blogPost.findUnique({
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

    if (!post) {
      throw new NotFoundException("Post not found")
    }

    // Increment view count
    await this.prisma.blogPost.update({
      where: { id },
      data: { views: { increment: 1 } },
    })

    return post
  }

  async update(id: string, userId: string, updatePostDto: UpdatePostDto) {
    const post = await this.prisma.blogPost.findUnique({
      where: { id },
    })

    if (!post) {
      throw new NotFoundException("Post not found")
    }

    if (post.userId !== userId) {
      throw new ForbiddenException("You can only update your own posts")
    }

    return this.prisma.blogPost.update({
      where: { id },
      data: {
        title: updatePostDto.title,
        content: updatePostDto.content,
        excerpt: updatePostDto.excerpt,
        image: updatePostDto.coverImage,
        isPublished: updatePostDto.published,
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
    const post = await this.prisma.blogPost.findUnique({
      where: { id },
    })

    if (!post) {
      throw new NotFoundException("Post not found")
    }

    if (post.userId !== userId) {
      throw new ForbiddenException("You can only delete your own posts")
    }

    await this.prisma.blogPost.delete({
      where: { id },
    })

    // Decrement user's posts count
    await this.prisma.user.update({
      where: { id: userId },
      data: { posts: { decrement: 1 } },
    })

    return { message: "Post deleted successfully" }
  }

  async findBySlug(slug: string) {
    // Since there's no slug field in schema, we'll use id instead
    // If slug is actually needed, it should be added to the schema
    return this.findOne(slug)
  }

  async incrementView(slug: string) {
    // Since there's no slug field in schema, we'll use id instead
    const post = await this.prisma.blogPost.findUnique({
      where: { id: slug },
    })

    if (!post) {
      throw new NotFoundException("Post not found")
    }

    await this.prisma.blogPost.update({
      where: { id: slug },
      data: { views: { increment: 1 } },
    })

    return { message: "View count incremented" }
  }
}
