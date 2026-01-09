import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req } from "@nestjs/common"
import { EventsService } from "./events.service"
import { AuthenticatedGuard } from "../auth/guards/authenticated.guard"
import { RolesGuard } from "../auth/guards/roles.guard"
import { Roles } from "../auth/decorators/roles.decorator"
import type { CreateEventDto, UpdateEventDto, EventQueryDto, EventRegistrationDto } from "./dto/event.dto"

@Controller("events")
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async findAll(query: EventQueryDto) {
    return this.eventsService.findAll(query)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Post()
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Roles("ORGANIZER", "ADMIN")
  async create(@Body() createEventDto: CreateEventDto, @Req() req: { user: { id: string } }) {
    return this.eventsService.create(createEventDto, req.user.id)
  }

  @Put(":id")
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Roles("ORGANIZER", "ADMIN")
  async update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto, @Req() req: { user: { id: string } }) {
    return this.eventsService.update(id, updateEventDto, req.user.id)
  }

  @Delete(":id")
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Roles("ORGANIZER", "ADMIN")
  async remove(@Param('id') id: string, @Req() req: { user: { id: string } }) {
    return this.eventsService.remove(id, req.user.id)
  }

  @Post(":id/register")
  @UseGuards(AuthenticatedGuard)
  async register(@Param('id') id: string, @Body() registrationData: EventRegistrationDto, @Req() req: { user: { id: string } }) {
    return this.eventsService.registerForEvent(id, req.user.id, registrationData)
  }

  @Get(':id/registrations')
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Roles('ORGANIZER', 'ADMIN')
  async getRegistrations(@Param('id') id: string) {
    return this.eventsService.getRegistrations(id);
  }

  @Delete(":id/register")
  @UseGuards(AuthenticatedGuard)
  async unregister(@Param('id') id: string, @Req() req: { user: { id: string } }) {
    return this.eventsService.unregisterFromEvent(id, req.user.id)
  }
}
