import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from "@nestjs/common"
import { LearningService } from "./learning.service"
import { AuthenticatedGuard } from "../auth/guards/authenticated.guard"
import { RolesGuard } from "../auth/guards/roles.guard"
import { Roles } from "../auth/decorators/roles.decorator"
import type { CreateLearningResourceDto, UpdateLearningResourceDto } from "./dto/learning.dto"

@Controller("learning")
export class LearningController {
  constructor(private readonly learningService: LearningService) {}

  @Get()
  async findAll(@Query() query: unknown) {
    return this.learningService.findAll(query as Parameters<typeof this.learningService.findAll>[0])
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.learningService.findOne(id);
  }

  @Post()
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Roles('ADMIN', 'MODERATOR')
  async create(@Body() createLearningResourceDto: CreateLearningResourceDto) {
    return this.learningService.create(createLearningResourceDto);
  }

  @Put(":id")
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Roles("ADMIN", "MODERATOR")
  async update(@Param('id') id: string, @Body() updateLearningResourceDto: UpdateLearningResourceDto) {
    return this.learningService.update(id, updateLearningResourceDto)
  }

  @Delete(':id')
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Roles('ADMIN')
  async remove(@Param('id') id: string) {
    return this.learningService.remove(id);
  }
}
