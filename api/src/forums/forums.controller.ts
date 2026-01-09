import { Controller, Get, Post, Patch, Delete, Param, UseGuards, Req } from "@nestjs/common"
import { ForumsService } from "./forums.service"
import { AuthenticatedGuard } from "../auth/guards/authenticated.guard"
import type { CreateForumDto } from "./dto/create-forum.dto"
import type { UpdateForumDto } from "./dto/update-forum.dto"

@Controller("forums")
export class ForumsController {
  constructor(private readonly forumsService: ForumsService) {}

  @UseGuards(AuthenticatedGuard)
  @Post()
  create(createForumDto: CreateForumDto, @Req() req: { user: { id: string } }) {
    return this.forumsService.create(req.user.id, createForumDto)
  }

  @Get()
  findAll() {
    return this.forumsService.findAll()
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.forumsService.findBySlug(slug);
  }

  @UseGuards(AuthenticatedGuard)
  @Patch(":id")
  update(@Param('id') id: string, updateForumDto: UpdateForumDto, @Req() req: { user: { id: string } }) {
    return this.forumsService.update(id, req.user.id, updateForumDto)
  }

  @UseGuards(AuthenticatedGuard)
  @Delete(":id")
  remove(@Param('id') id: string, @Req() req: { user: { id: string } }) {
    return this.forumsService.remove(id, req.user.id)
  }

  @Post(':slug/view')
  incrementView(@Param('slug') slug: string) {
    return this.forumsService.incrementView(slug);
  }
}
