import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Req } from "@nestjs/common"
import { ProjectsService } from "./projects.service"
import { AuthenticatedGuard } from "../auth/guards/authenticated.guard"
import type { CreateProjectDto, UpdateProjectDto, ProjectQueryDto } from "./dto/project.dto"

@Controller("projects")
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  async findAll(@Query() query: ProjectQueryDto) {
    return this.projectsService.findAll(query)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Post()
  @UseGuards(AuthenticatedGuard)
  async create(@Body() createProjectDto: CreateProjectDto, @Req() req: { user: { id: string } }) {
    return this.projectsService.create(createProjectDto, req.user.id)
  }

  @Put(":id")
  @UseGuards(AuthenticatedGuard)
  async update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto, @Req() req: { user: { id: string } }) {
    return this.projectsService.update(id, updateProjectDto, req.user.id)
  }

  @Delete(":id")
  @UseGuards(AuthenticatedGuard)
  async remove(@Param('id') id: string, @Req() req: { user: { id: string } }) {
    return this.projectsService.remove(id, req.user.id)
  }
}
