import { Injectable, NotFoundException, ForbiddenException } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import type { CreateJobDto, UpdateJobDto, JobQueryDto, JobApplicationDto } from "./dto/job.dto"
import { JobCategory, JobType, JobStatus } from "@prisma/client"

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: JobQueryDto) {
    const { page = 1, limit = 10, category, type, isRemote, search, status = "ACTIVE" } = query

    const skip = (page - 1) * limit
    // Use type inference - Prisma will validate the type when passed to the query
    const where: Record<string, unknown> = {
      status: status as JobStatus,
      isActive: true,
    }

    if (category) where.category = category as JobCategory
    if (type) where.type = type as JobType
    if (isRemote !== undefined) where.isRemote = isRemote === "true"
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { company: { contains: search, mode: "insensitive" } },
      ]
    }

    const [jobs, total] = await Promise.all([
      this.prisma.job.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true,
            },
          },
          _count: {
            select: { applications: true },
          },
        },
      }),
      this.prisma.job.count({ where }),
    ])

    return {
      jobs,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    }
  }

  async findOne(id: string) {
    const job = await this.prisma.job.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
        _count: {
          select: { applications: true },
        },
      },
    })

    if (!job) {
      throw new NotFoundException("Job not found")
    }

    // Increment view count
    await this.prisma.job.update({
      where: { id },
      data: { views: { increment: 1 } },
    })

    return job
  }

  async create(createJobDto: CreateJobDto, userId: string) {
    return this.prisma.job.create({
      data: {
        title: createJobDto.title,
        description: createJobDto.description,
        company: createJobDto.company,
        logo: createJobDto.logo,
        location: createJobDto.location,
        type: createJobDto.type as JobType,
        salary: createJobDto.salary,
        experience: createJobDto.experience,
        category: createJobDto.category as JobCategory,
        skills: createJobDto.skills,
        isRemote: createJobDto.isRemote,
        isFeatured: createJobDto.isFeatured,
        requirements: createJobDto.requirements,
        responsibilities: createJobDto.responsibilities,
        benefits: createJobDto.benefits,
        companyDescription: createJobDto.companyDescription,
        companyEmployees: createJobDto.companyEmployees,
        companyIndustry: createJobDto.companyIndustry,
        companyFounded: createJobDto.companyFounded,
        companyWebsite: createJobDto.companyWebsite,
        userId,
      },
    })
  }

  async update(id: string, updateJobDto: UpdateJobDto, userId: string) {
    const job = await this.prisma.job.findUnique({ where: { id } })

    if (!job) {
      throw new NotFoundException("Job not found")
    }

    if (job.userId !== userId) {
      throw new ForbiddenException("You can only update your own jobs")
    }

    const updateData: Record<string, unknown> = {}
    if (updateJobDto.title !== undefined) updateData.title = updateJobDto.title
    if (updateJobDto.description !== undefined) updateData.description = updateJobDto.description
    if (updateJobDto.company !== undefined) updateData.company = updateJobDto.company
    if (updateJobDto.logo !== undefined) updateData.logo = updateJobDto.logo
    if (updateJobDto.location !== undefined) updateData.location = updateJobDto.location
    if (updateJobDto.type !== undefined) updateData.type = updateJobDto.type as JobType
    if (updateJobDto.salary !== undefined) updateData.salary = updateJobDto.salary
    if (updateJobDto.experience !== undefined) updateData.experience = updateJobDto.experience
    if (updateJobDto.category !== undefined) updateData.category = updateJobDto.category as JobCategory
    if (updateJobDto.skills !== undefined) updateData.skills = updateJobDto.skills
    if (updateJobDto.isRemote !== undefined) updateData.isRemote = updateJobDto.isRemote
    if (updateJobDto.isFeatured !== undefined) updateData.isFeatured = updateJobDto.isFeatured
    if (updateJobDto.status !== undefined) updateData.status = updateJobDto.status as JobStatus
    if (updateJobDto.requirements !== undefined) updateData.requirements = updateJobDto.requirements
    if (updateJobDto.responsibilities !== undefined) updateData.responsibilities = updateJobDto.responsibilities
    if (updateJobDto.benefits !== undefined) updateData.benefits = updateJobDto.benefits
    if (updateJobDto.companyDescription !== undefined) updateData.companyDescription = updateJobDto.companyDescription
    if (updateJobDto.companyEmployees !== undefined) updateData.companyEmployees = updateJobDto.companyEmployees
    if (updateJobDto.companyIndustry !== undefined) updateData.companyIndustry = updateJobDto.companyIndustry
    if (updateJobDto.companyFounded !== undefined) updateData.companyFounded = updateJobDto.companyFounded
    if (updateJobDto.companyWebsite !== undefined) updateData.companyWebsite = updateJobDto.companyWebsite

    return this.prisma.job.update({
      where: { id },
      data: updateData,
    })
  }

  async remove(id: string, userId: string) {
    const job = await this.prisma.job.findUnique({ where: { id } })

    if (!job) {
      throw new NotFoundException("Job not found")
    }

    if (job.userId !== userId) {
      throw new ForbiddenException("You can only delete your own jobs")
    }

    await this.prisma.job.delete({ where: { id } })
    return { message: "Job deleted successfully" }
  }

  async applyToJob(jobId: string, userId: string, applicationData: JobApplicationDto) {
    const job = await this.prisma.job.findUnique({ where: { id: jobId } })

    if (!job) {
      throw new NotFoundException("Job not found")
    }

    if (job.status !== "ACTIVE") {
      throw new ForbiddenException("This job is not accepting applications")
    }

    const existingApplication = await this.prisma.jobApplication.findFirst({
      where: { jobId, userId },
    })

    if (existingApplication) {
      throw new ForbiddenException("You have already applied to this job")
    }

    const application = await this.prisma.jobApplication.create({
      data: {
        jobId,
        userId,
        firstName: applicationData.firstName,
        lastName: applicationData.lastName,
        email: applicationData.email,
        phone: applicationData.phone,
        portfolio: applicationData.portfolio,
        linkedin: applicationData.linkedin,
        github: applicationData.github,
        experience: applicationData.experience,
        skills: applicationData.skills,
        coverLetter: applicationData.coverLetter,
        resume: applicationData.resume,
        availability: applicationData.availability ?? "immediate",
        salary: applicationData.salary,
      },
    })

    await this.prisma.job.update({
      where: { id: jobId },
      data: { applicationCount: { increment: 1 } },
    })

    return application
  }

  async getApplications(jobId: string) {
    return this.prisma.jobApplication.findMany({
      where: { jobId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
      },
      orderBy: { appliedAt: "desc" },
    })
  }
}
