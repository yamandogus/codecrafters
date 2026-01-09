import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import type { CreateCommentDto } from "./dto/create-comment.dto"
import type { UpdateCommentDto } from "./dto/update-comment.dto"

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(authorId: string, createCommentDto: CreateCommentDto) {
    const { postId, forumId, projectId, content } = createCommentDto

    const targetCount = [postId, forumId, projectId].filter(Boolean).length

    if (targetCount === 0) {
      throw new BadRequestException("Comment must belong to a post, forum, or project")
    }

    if (targetCount > 1) {
      throw new BadRequestException("Comment cannot belong to multiple targets")
    }

    const comment = await this.prisma.comment.create({
      data: {
        content,
        userId: authorId,
        blogPostId: postId || null,
        forumPostId: forumId || null,
        projectId: projectId || null,
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

    // Increment replies count for forum posts
    if (forumId) {
      await this.prisma.forumPost.update({
        where: { id: forumId },
        data: { replies: { increment: 1 } },
      })
    }

    return comment
  }

  async findByPost(postId: string) {
    return this.prisma.comment.findMany({
      where: {
        blogPostId: postId,
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
      orderBy: {
        createdAt: "desc",
      },
    })
  }

  async findByForum(forumId: string) {
    return this.prisma.comment.findMany({
      where: {
        forumPostId: forumId,
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
      orderBy: {
        createdAt: "desc",
      },
    })
  }

  async findByProject(projectId: string) {
    return this.prisma.comment.findMany({
      where: {
        projectId,
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
      orderBy: {
        createdAt: "desc",
      },
    })
  }

  async update(id: string, userId: string, updateCommentDto: UpdateCommentDto) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
    })

    if (!comment) {
      throw new NotFoundException("Comment not found")
    }

    if (comment.userId !== userId) {
      throw new ForbiddenException("You can only update your own comments")
    }

    return this.prisma.comment.update({
      where: { id },
      data: updateCommentDto,
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
    const comment = await this.prisma.comment.findUnique({
      where: { id },
    })

    if (!comment) {
      throw new NotFoundException("Comment not found")
    }

    if (comment.userId !== userId) {
      throw new ForbiddenException("You can only delete your own comments")
    }

    // Decrement replies count for forum posts
    if (comment.forumPostId) {
      await this.prisma.forumPost.update({
        where: { id: comment.forumPostId },
        data: { replies: { decrement: 1 } },
      })
    }

    await this.prisma.comment.delete({
      where: { id },
    })

    return { message: "Comment deleted successfully" }
  }
}
