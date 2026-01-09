import { Injectable, NotFoundException } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import type { UpdateUserDto, AddSkillDto, AddExperienceDto, AddEducationDto, UserQueryDto } from "./dto/user.dto"
import { UserRole, SkillLevel } from "@prisma/client"


@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: UserQueryDto = {}) {
    const { page = 1, limit = 10, role, isMentor, search } = query

    const skip = (page - 1) * limit
    // Use type inference - Prisma will validate the type when passed to the query
    const where: Record<string, unknown> = {
      isActive: true,
    }

    if (role) where.role = role as UserRole
    if (isMentor !== undefined) where.isMentor = isMentor === "true"
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { username: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ]
    }

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        select: {
          id: true,
          email: true,
          username: true,
          name: true,
          surname: true,
          bio: true,
          avatar: true,
          coverImage: true,
          location: true,
          role: true,
          isMentor: true,
          isVerified: true,
          github: true,
          linkedin: true,
          twitter: true,
          website: true,
          projects: true,
          events: true,
          followers: true,
          following: true,
          posts: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
      this.prisma.user.count({ where }),
    ])

    return {
      users,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    }
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        skills: true,
        achievements: true,
        experience: {
          orderBy: { startDate: "desc" },
        },
        education: {
          orderBy: { startDate: "desc" },
        },
        projectsCreated: {
          orderBy: { createdAt: "desc" },
          take: 10,
        },
        blogPosts: {
          orderBy: { createdAt: "desc" },
          take: 10,
        },
        _count: {
          select: {
            blogPosts: true,
            forumPosts: true,
            projectsCreated: true,
            followersRelation: true,
            followingRelation: true,
            eventsRegistered: true,
          },
        },
      },
    })

    if (!user) {
      throw new NotFoundException("User not found")
    }

    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    })
  }

  async findByUsername(username: string) {
    const user = await this.prisma.user.findUnique({
      where: { username },
      include: {
        skills: true,
        achievements: true,
        experience: {
          orderBy: { startDate: "desc" },
        },
        education: {
          orderBy: { startDate: "desc" },
        },
        projectsCreated: {
          orderBy: { createdAt: "desc" },
          take: 10,
        },
        blogPosts: {
          orderBy: { createdAt: "desc" },
          take: 10,
        },
        _count: {
          select: {
            blogPosts: true,
            forumPosts: true,
            projectsCreated: true,
            followersRelation: true,
            followingRelation: true,
            eventsRegistered: true,
          },
        },
      },
    })

    if (!user) {
      throw new NotFoundException("User not found")
    }

    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
  }

  // Username kontrolü için ayrı metod (findByUsername exception fırlatıyor)
  async findUsernameExists(username: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { username },
    })
    return !!user
  }

  async create(createUserData: {
    email: string
    username: string
    password: string
    name: string
    surname?: string
  }) {
    return this.prisma.user.create({
      data: {
        email: createUserData.email,
        username: createUserData.username,
        password: createUserData.password,
        name: createUserData.name,
        surname: createUserData.surname,
      },
    })
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        surname: true,
        bio: true,
        avatar: true,
        coverImage: true,
        location: true,
        phone: true,
        role: true,
        isMentor: true,
        github: true,
        linkedin: true,
        twitter: true,
        website: true,
        updatedAt: true,
      },
    })

    return user
  }

  async remove(id: string) {
    await this.prisma.user.delete({
      where: { id },
    })

    return { message: "User deleted successfully" }
  }

  async addSkill(userId: string, addSkillDto: AddSkillDto) {
    return this.prisma.userSkill.create({
      data: {
        userId,
        name: addSkillDto.name,
        level: addSkillDto.level as SkillLevel,
        color: addSkillDto.color,
      },
    })
  }

  async removeSkill(userId: string, skillId: string) {
    const skill = await this.prisma.userSkill.findUnique({
      where: { id: skillId },
    })

    if (!skill || skill.userId !== userId) {
      throw new NotFoundException("Skill not found")
    }

    await this.prisma.userSkill.delete({
      where: { id: skillId },
    })

    return { message: "Skill removed successfully" }
  }

  async addExperience(userId: string, addExperienceDto: AddExperienceDto) {
    return this.prisma.userExperience.create({
      data: {
        userId,
        title: addExperienceDto.title,
        company: addExperienceDto.company,
        startDate: new Date(addExperienceDto.startDate),
        endDate: addExperienceDto.endDate ? new Date(addExperienceDto.endDate) : null,
        description: addExperienceDto.description,
      },
    })
  }

  async removeExperience(userId: string, experienceId: string) {
    const experience = await this.prisma.userExperience.findUnique({
      where: { id: experienceId },
    })

    if (!experience || experience.userId !== userId) {
      throw new NotFoundException("Experience not found")
    }

    await this.prisma.userExperience.delete({
      where: { id: experienceId },
    })

    return { message: "Experience removed successfully" }
  }

  async addEducation(userId: string, addEducationDto: AddEducationDto) {
    return this.prisma.userEducation.create({
      data: {
        userId,
        school: addEducationDto.school,
        degree: addEducationDto.degree,
        field: addEducationDto.field,
        startDate: new Date(addEducationDto.startDate),
        endDate: addEducationDto.endDate ? new Date(addEducationDto.endDate) : null,
        description: addEducationDto.description,
      },
    })
  }

  async removeEducation(userId: string, educationId: string) {
    const education = await this.prisma.userEducation.findUnique({
      where: { id: educationId },
    })

    if (!education || education.userId !== userId) {
      throw new NotFoundException("Education not found")
    }

    await this.prisma.userEducation.delete({
      where: { id: educationId },
    })

    return { message: "Education removed successfully" }
  }

  async followUser(followerId: string, followingId: string) {
    if (followerId === followingId) {
      throw new NotFoundException("You cannot follow yourself")
    }

    const existingFollow = await this.prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    })

    if (existingFollow) {
      throw new NotFoundException("Already following this user")
    }

    await this.prisma.follow.create({
      data: {
        followerId,
        followingId,
      },
    })

    await Promise.all([
      this.prisma.user.update({
        where: { id: followerId },
        data: { following: { increment: 1 } },
      }),
      this.prisma.user.update({
        where: { id: followingId },
        data: { followers: { increment: 1 } },
      }),
    ])

    return { message: "Successfully followed user" }
  }

  async unfollowUser(followerId: string, followingId: string) {
    const existingFollow = await this.prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    })

    if (!existingFollow) {
      throw new NotFoundException("Not following this user")
    }

    await this.prisma.follow.delete({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    })

    await Promise.all([
      this.prisma.user.update({
        where: { id: followerId },
        data: { following: { decrement: 1 } },
      }),
      this.prisma.user.update({
        where: { id: followingId },
        data: { followers: { decrement: 1 } },
      }),
    ])

    return { message: "Successfully unfollowed user" }
  }

  async getFollowers(userId: string) {
    const follows = await this.prisma.follow.findMany({
      where: { followingId: userId },
      include: {
        follower: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true,
            bio: true,
          },
        },
      },
    })

    return follows.map((f) => f.follower)
  }

  async getFollowing(userId: string) {
    const follows = await this.prisma.follow.findMany({
      where: { followerId: userId },
      include: {
        following: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true,
            bio: true,
          },
        },
      },
    })

    return follows.map((f) => f.following)
  }

  async findByGoogleId(googleId: string) {
    return this.prisma.user.findUnique({
      where: { googleId },
    })
  }

  async findByGithubId(githubId: string) {
    return this.prisma.user.findUnique({
      where: { githubId },
    })
  }

  async createOAuthUser(data: {
    email: string
    name: string
    surname?: string
    googleId?: string
    githubId?: string
    provider: "google" | "github"
    avatar?: string
  }) {
    // Generate unique username from email
    const baseUsername = data.email.split("@")[0]
    let username = baseUsername
    let counter = 1

    // Ensure username is unique
    while (await this.prisma.user.findUnique({ where: { username } })) {
      username = `${baseUsername}${counter}`
      counter++
    }

    return this.prisma.user.create({
      data: {
        email: data.email,
        username,
        name: data.name,
        surname: data.surname,
        googleId: data.googleId,
        githubId: data.githubId,
        provider: data.provider,
        avatar: data.avatar,
        isVerified: true, // OAuth users are verified
      },
    })
  }

  async updateOAuthUser(userId: string, data: {
    googleId?: string
    githubId?: string
    provider?: "google" | "github"
    avatar?: string
  }) {
    return this.prisma.user.update({
      where: { id: userId },
      data,
    })
  }

  async getDashboard(userId: string) {
    const [applications, eventRegistrations] = await Promise.all([
      this.prisma.jobApplication.findMany({
        where: { userId },
        include: {
          job: {
            select: {
              id: true,
              title: true,
              company: true,
              location: true,
              type: true,
              category: true,
              status: true,
            },
          },
        },
        orderBy: { appliedAt: "desc" },
        take: 5, // Son 5 başvuru
      }),
      this.prisma.eventRegistration.findMany({
        where: { userId },
        include: {
          event: {
            select: {
              id: true,
              title: true,
              description: true,
              startDate: true,
              endDate: true,
              location: true,
              isOnline: true,
              image: true,
              status: true,
            },
          },
        },
        orderBy: { registeredAt: "desc" },
      }),
    ])

    // Sadece yaklaşan etkinlikleri filtrele (startDate bugünden sonra)
    const now = new Date()
    const upcomingEvents = eventRegistrations
      .filter(reg => new Date(reg.event.startDate) >= now)
      .map(reg => reg.event)
      .slice(0, 5) // İlk 5 yaklaşan etkinlik

    // Toplam sayılar
    const [totalApplications, totalEvents] = await Promise.all([
      this.prisma.jobApplication.count({ where: { userId } }),
      this.prisma.eventRegistration.count({ where: { userId } }),
    ])

    return {
      stats: {
        totalApplications,
        totalEvents,
      },
      recentApplications: applications.map(app => ({
        id: app.id,
        status: app.status,
        appliedAt: app.appliedAt.toISOString(),
        job: app.job,
      })),
      upcomingEvents: upcomingEvents.map(event => ({
        id: event.id,
        title: event.title,
        description: event.description,
        startDate: event.startDate.toISOString(),
        endDate: event.endDate.toISOString(),
        location: event.location,
        isOnline: event.isOnline,
        image: event.image,
        status: event.status,
      })),
    }
  }
}
