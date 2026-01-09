import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import type { CreateEventDto, UpdateEventDto, EventQueryDto, EventRegistrationDto } from "./dto/event.dto"
import { EventCategory, EventStatus } from "@prisma/client"

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: EventQueryDto) {
    const { page = 1, limit = 10, category, status, isOnline, search } = query

    const skip = (page - 1) * limit
    // Use type inference - Prisma will validate the type when passed to the query
    const where: Record<string, unknown> = {}

    if (category) where.category = category as EventCategory
    if (status) where.status = status as EventStatus
    if (isOnline !== undefined) where.isOnline = isOnline === "true"
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { location: { contains: search, mode: "insensitive" } },
      ]
    }

    const [events, total] = await Promise.all([
      this.prisma.event.findMany({
        where,
        skip,
        take: limit,
        orderBy: { startDate: "desc" },
        include: {
          organizerUser: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true,
            },
          },
          _count: {
            select: { registrations: true },
          },
        },
      }),
      this.prisma.event.count({ where }),
    ])

    return {
      events,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    }
  }

  async findOne(id: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
      include: {
        organizerUser: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
        _count: {
          select: { registrations: true },
        },
      },
    })

    if (!event) {
      throw new NotFoundException("Event not found")
    }

    return event
  }

  async create(createEventDto: CreateEventDto, userId: string) {
    return this.prisma.event.create({
      data: {
        title: createEventDto.title,
        description: createEventDto.description,
        longDescription: createEventDto.longDescription,
        category: createEventDto.category as EventCategory,
        startDate: createEventDto.startDate,
        endDate: createEventDto.endDate,
        location: createEventDto.location,
        address: createEventDto.address,
        isOnline: createEventDto.isOnline,
        maxParticipants: createEventDto.maxParticipants,
        organizer: createEventDto.organizer,
        organizerEmail: createEventDto.organizerEmail,
        organizerPhone: createEventDto.organizerPhone,
        organizerWebsite: createEventDto.organizerWebsite,
        organizerDescription: createEventDto.organizerDescription,
        tags: createEventDto.tags,
        image: createEventDto.image,
        price: createEventDto.price,
        requirements: createEventDto.requirements,
        organizerId: userId,
      },
    })
  }

  async update(id: string, updateEventDto: UpdateEventDto, userId: string) {
    const event = await this.prisma.event.findUnique({ where: { id } })

    if (!event) {
      throw new NotFoundException("Event not found")
    }

    if (event.organizerId !== userId) {
      throw new ForbiddenException("You can only update your own events")
    }

    const updateData: Record<string, unknown> = {}
    if (updateEventDto.title !== undefined) updateData.title = updateEventDto.title
    if (updateEventDto.description !== undefined) updateData.description = updateEventDto.description
    if (updateEventDto.longDescription !== undefined) updateData.longDescription = updateEventDto.longDescription
    if (updateEventDto.category !== undefined) updateData.category = updateEventDto.category as EventCategory
    if (updateEventDto.startDate !== undefined) updateData.startDate = updateEventDto.startDate
    if (updateEventDto.endDate !== undefined) updateData.endDate = updateEventDto.endDate
    if (updateEventDto.location !== undefined) updateData.location = updateEventDto.location
    if (updateEventDto.address !== undefined) updateData.address = updateEventDto.address
    if (updateEventDto.isOnline !== undefined) updateData.isOnline = updateEventDto.isOnline
    if (updateEventDto.maxParticipants !== undefined) updateData.maxParticipants = updateEventDto.maxParticipants
    if (updateEventDto.organizer !== undefined) updateData.organizer = updateEventDto.organizer
    if (updateEventDto.organizerEmail !== undefined) updateData.organizerEmail = updateEventDto.organizerEmail
    if (updateEventDto.organizerPhone !== undefined) updateData.organizerPhone = updateEventDto.organizerPhone
    if (updateEventDto.organizerWebsite !== undefined) updateData.organizerWebsite = updateEventDto.organizerWebsite
    if (updateEventDto.organizerDescription !== undefined) updateData.organizerDescription = updateEventDto.organizerDescription
    if (updateEventDto.tags !== undefined) updateData.tags = updateEventDto.tags
    if (updateEventDto.image !== undefined) updateData.image = updateEventDto.image
    if (updateEventDto.status !== undefined) updateData.status = updateEventDto.status as EventStatus
    if (updateEventDto.price !== undefined) updateData.price = updateEventDto.price
    if (updateEventDto.requirements !== undefined) updateData.requirements = updateEventDto.requirements

    return this.prisma.event.update({
      where: { id },
      data: updateData,
    })
  }

  async remove(id: string, userId: string) {
    const event = await this.prisma.event.findUnique({ where: { id } })

    if (!event) {
      throw new NotFoundException("Event not found")
    }

    if (event.organizerId !== userId) {
      throw new ForbiddenException("You can only delete your own events")
    }

    await this.prisma.event.delete({ where: { id } })
    return { message: "Event deleted successfully" }
  }

  async registerForEvent(eventId: string, userId: string, registrationData: EventRegistrationDto) {
    const event = await this.prisma.event.findUnique({ where: { id: eventId } })

    if (!event) {
      throw new NotFoundException("Event not found")
    }

    if (event.status !== "UPCOMING") {
      throw new BadRequestException("Cannot register for this event")
    }

    if (event.maxParticipants && event.currentParticipants >= event.maxParticipants) {
      throw new BadRequestException("Event is full")
    }

    const existingRegistration = await this.prisma.eventRegistration.findUnique({
      where: {
        eventId_userId: { eventId, userId },
      },
    })

    if (existingRegistration) {
      throw new BadRequestException("You are already registered for this event")
    }

    const registration = await this.prisma.eventRegistration.create({
      data: {
        eventId,
        userId,
        experience: registrationData.experience,
        motivation: registrationData.motivation,
      },
    })

    await this.prisma.event.update({
      where: { id: eventId },
      data: { currentParticipants: { increment: 1 } },
    })

    return registration
  }

  async unregisterFromEvent(eventId: string, userId: string) {
    const registration = await this.prisma.eventRegistration.findUnique({
      where: {
        eventId_userId: { eventId, userId },
      },
    })

    if (!registration) {
      throw new NotFoundException("Registration not found")
    }

    await this.prisma.eventRegistration.delete({
      where: {
        eventId_userId: { eventId, userId },
      },
    })

    await this.prisma.event.update({
      where: { id: eventId },
      data: { currentParticipants: { decrement: 1 } },
    })

    return { message: "Successfully unregistered from event" }
  }

  async getRegistrations(eventId: string) {
    return this.prisma.eventRegistration.findMany({
      where: { eventId },
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
      orderBy: { registeredAt: "desc" },
    })
  }

  async getMyRegistrations(userId: string) {
    const registrations = await this.prisma.eventRegistration.findMany({
      where: { userId },
      include: {
        event: {
          include: {
            organizerUser: {
              select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
              },
            },
            _count: {
              select: { registrations: true },
            },
          },
        },
      },
      orderBy: { registeredAt: "desc" },
    })

    // Map registrations to include event data with registration info
    return registrations.map(reg => ({
      ...reg.event,
      registrations: [{
        id: reg.id,
        registeredAt: reg.registeredAt,
        status: reg.status,
        experience: reg.experience,
        motivation: reg.motivation,
      }],
    }))
  }
}
