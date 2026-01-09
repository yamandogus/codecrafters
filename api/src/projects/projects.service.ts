import { Injectable, NotFoundException, ForbiddenException } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import type { CreateProjectDto, UpdateProjectDto, ProjectQueryDto } from "./dto/project.dto"
import { ProjectCategory } from "@prisma/client"

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: ProjectQueryDto) {
    const { page = 1, limit = 10, category, featured, search } = query

    const skip = (page - 1) * limit
    // Use type inference - Prisma will validate the type when passed to the query
    const where: Record<string, unknown> = {
      isActive: true,
    }

    if (category) where.category = category as ProjectCategory
    if (featured !== undefined) where.featured = featured === "true"
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ]
    }

    const [projects, total] = await Promise.all([
      this.prisma.project.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              username: true,
              avatar: true,
            },
          },
          _count: {
            select: { comments: true },
          },
        },
      }),
      this.prisma.project.count({ where }),
    ])

    return {
      projects,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    }
  }

  async findOne(id: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true,
          },
        },
        comments: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                username: true,
                avatar: true,
              },
            },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    })

    if (!project) {
      throw new NotFoundException("Project not found")
    }

    // Increment view count
    await this.prisma.project.update({
      where: { id },
      data: { views: { increment: 1 } },
    })

    return project
  }

  async create(createProjectDto: CreateProjectDto, userId: string) {
    const project = await this.prisma.project.create({
      data: {
        title: createProjectDto.title,
        description: createProjectDto.description,
        category: createProjectDto.category as ProjectCategory,
        image: createProjectDto.image,
        tech: createProjectDto.tech,
        demo: createProjectDto.demo,
        github: createProjectDto.github,
        featured: createProjectDto.featured,
        userId,
      },
    })

    // Increment user's projects count
    await this.prisma.user.update({
      where: { id: userId },
      data: { projects: { increment: 1 } },
    })

    return project
  }

  async update(id: string, updateProjectDto: UpdateProjectDto, userId: string) {
    const project = await this.prisma.project.findUnique({ where: { id } })

    if (!project) {
      throw new NotFoundException("Project not found")
    }

    if (project.userId !== userId) {
      throw new ForbiddenException("You can only update your own projects")
    }

    const updateData: Record<string, unknown> = {}
    if (updateProjectDto.title !== undefined) updateData.title = updateProjectDto.title
    if (updateProjectDto.description !== undefined) updateData.description = updateProjectDto.description
    if (updateProjectDto.category !== undefined) updateData.category = updateProjectDto.category as ProjectCategory
    if (updateProjectDto.image !== undefined) updateData.image = updateProjectDto.image
    if (updateProjectDto.tech !== undefined) updateData.tech = updateProjectDto.tech
    if (updateProjectDto.demo !== undefined) updateData.demo = updateProjectDto.demo
    if (updateProjectDto.github !== undefined) updateData.github = updateProjectDto.github
    if (updateProjectDto.featured !== undefined) updateData.featured = updateProjectDto.featured
    if (updateProjectDto.isActive !== undefined) updateData.isActive = updateProjectDto.isActive

    return this.prisma.project.update({
      where: { id },
      data: updateData,
    })
  }

  async remove(id: string, userId: string) {
    const project = await this.prisma.project.findUnique({ where: { id } })

    if (!project) {
      throw new NotFoundException("Project not found")
    }

    if (project.userId !== userId) {
      throw new ForbiddenException("You can only delete your own projects")
    }

    await this.prisma.project.delete({ where: { id } })

    // Decrement user's projects count
    await this.prisma.user.update({
      where: { id: userId },
      data: { projects: { decrement: 1 } },
    })

    return { message: "Project deleted successfully" }
  }
}
