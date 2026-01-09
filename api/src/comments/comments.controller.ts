import { Controller, Get, Post, Patch, Delete, Param, UseGuards, Req } from "@nestjs/common"
import { CommentsService } from "./comments.service"
import { AuthenticatedGuard } from "../auth/guards/authenticated.guard"
import type { CreateCommentDto } from "./dto/create-comment.dto"
import type { UpdateCommentDto } from "./dto/update-comment.dto"

@Controller("comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(AuthenticatedGuard)
  @Post()
  create(createCommentDto: CreateCommentDto, @Req() req: { user: { id: string } }) {
    return this.commentsService.create(req.user.id, createCommentDto)
  }

  @Get('post/:postId')
  findByPost(@Param('postId') postId: string) {
    return this.commentsService.findByPost(postId);
  }

  @Get('forum/:forumId')
  findByForum(@Param('forumId') forumId: string) {
    return this.commentsService.findByForum(forumId);
  }

  @UseGuards(AuthenticatedGuard)
  @Patch(":id")
  update(@Param('id') id: string, updateCommentDto: UpdateCommentDto, @Req() req: { user: { id: string } }) {
    return this.commentsService.update(id, req.user.id, updateCommentDto)
  }

  @UseGuards(AuthenticatedGuard)
  @Delete(":id")
  remove(@Param('id') id: string, @Req() req: { user: { id: string } }) {
    return this.commentsService.remove(id, req.user.id)
  }
}
