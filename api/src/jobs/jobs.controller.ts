import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req } from "@nestjs/common"
import { JobsService } from "./jobs.service"
import { AuthenticatedGuard } from "../auth/guards/authenticated.guard"
import { RolesGuard } from "../auth/guards/roles.guard"
import { Roles } from "../auth/decorators/roles.decorator"
import type { CreateJobDto, UpdateJobDto, JobQueryDto, JobApplicationDto } from "./dto/job.dto"

@Controller("jobs")
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  async findAll(query: JobQueryDto) {
    return this.jobsService.findAll(query)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  @Post()
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Roles("COMPANY", "ADMIN")
  async create(@Body() createJobDto: CreateJobDto, @Req() req: { user: { id: string } }) {
    return this.jobsService.create(createJobDto, req.user.id)
  }

  @Put(":id")
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Roles("COMPANY", "ADMIN")
  async update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto, @Req() req: { user: { id: string } }) {
    return this.jobsService.update(id, updateJobDto, req.user.id)
  }

  @Delete(":id")
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Roles("COMPANY", "ADMIN")
  async remove(@Param('id') id: string, @Req() req: { user: { id: string } }) {
    return this.jobsService.remove(id, req.user.id)
  }

  @Post(":id/apply")
  @UseGuards(AuthenticatedGuard)
  async apply(@Param('id') id: string, @Body() applicationData: JobApplicationDto, @Req() req: { user: { id: string } }) {
    return this.jobsService.applyToJob(id, req.user.id, applicationData)
  }

  @Get(':id/applications')
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Roles('COMPANY', 'ADMIN')
  async getApplications(@Param('id') id: string) {
    return this.jobsService.getApplications(id);
  }
}
