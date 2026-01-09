import { Controller, Get, Post, Patch, Delete, Param, Query, UseGuards, Req } from "@nestjs/common"
import { PostsService } from "./posts.service"
import { AuthenticatedGuard } from "../auth/guards/authenticated.guard"
import type { CreatePostDto } from "./dto/create-post.dto"
import type { UpdatePostDto } from "./dto/update-post.dto"

@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(AuthenticatedGuard)
  @Post()
  create(createPostDto: CreatePostDto, @Req() req: { user: { id: string } }) {
    return this.postsService.create(req.user.id, createPostDto)
  }

  @Get()
  findAll(@Query('published') published?: string) {
    const isPublished = published === 'true';
    return this.postsService.findAll({ published: isPublished });
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.postsService.findBySlug(slug);
  }

  @UseGuards(AuthenticatedGuard)
  @Patch(":id")
  update(@Param('id') id: string, updatePostDto: UpdatePostDto, @Req() req: { user: { id: string } }) {
    return this.postsService.update(id, req.user.id, updatePostDto)
  }

  @UseGuards(AuthenticatedGuard)
  @Delete(":id")
  remove(@Param('id') id: string, @Req() req: { user: { id: string } }) {
    return this.postsService.remove(id, req.user.id)
  }

  @Post(':slug/view')
  incrementView(@Param('slug') slug: string) {
    return this.postsService.incrementView(slug);
  }
}
