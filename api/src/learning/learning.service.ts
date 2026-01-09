import { Injectable, NotFoundException } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import type { CreateLearningResourceDto, UpdateLearningResourceDto, LearningQueryDto } from "./dto/learning.dto"

@Injectable()
export class LearningService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: LearningQueryDto) {
    const { page = 1, limit = 10, category, level, search } = query

    const skip = (page - 1) * limit
    // Use type inference - Prisma will validate the type when passed to the query
    const where: Record<string, unknown> = {
      isActive: true,
    }

    if (category) where.category = { contains: category, mode: "insensitive" }
    if (level) where.level = { contains: level, mode: "insensitive" }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ]
    }

    const [resources, total] = await Promise.all([
      this.prisma.learningResource.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      this.prisma.learningResource.count({ where }),
    ])

    return {
      resources,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    }
  }

  async findOne(id: string) {
    const resource = await this.prisma.learningResource.findUnique({
      where: { id },
    })

    if (!resource) {
      throw new NotFoundException("Learning resource not found")
    }

    return resource
  }

  async create(createLearningResourceDto: CreateLearningResourceDto) {
    return this.prisma.learningResource.create({
      data: createLearningResourceDto,
    })
  }

  async update(id: string, updateLearningResourceDto: UpdateLearningResourceDto) {
    const resource = await this.prisma.learningResource.findUnique({ where: { id } })

    if (!resource) {
      throw new NotFoundException("Learning resource not found")
    }

    return this.prisma.learningResource.update({
      where: { id },
      data: updateLearningResourceDto,
    })
  }

  async remove(id: string) {
    const resource = await this.prisma.learningResource.findUnique({ where: { id } })

    if (!resource) {
      throw new NotFoundException("Learning resource not found")
    }

    await this.prisma.learningResource.delete({ where: { id } })
    return { message: "Learning resource deleted successfully" }
  }
}
