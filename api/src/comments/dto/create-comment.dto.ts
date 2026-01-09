import { IsString, IsNotEmpty, IsOptional } from "class-validator"

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  content: string

  @IsString()
  @IsOptional()
  postId?: string

  @IsString()
  @IsOptional()
  forumId?: string

  @IsString()
  @IsOptional()
  projectId?: string
}
