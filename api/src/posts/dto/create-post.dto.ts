import { IsString, IsNotEmpty, IsBoolean, IsOptional } from "class-validator"

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  content: string

  @IsString()
  @IsOptional()
  excerpt?: string

  @IsString()
  @IsOptional()
  coverImage?: string

  @IsBoolean()
  @IsOptional()
  published?: boolean = false
}
