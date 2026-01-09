import { IsString, IsBoolean, IsOptional } from "class-validator"

export class UpdatePostDto {
  @IsString()
  @IsOptional()
  title?: string

  @IsString()
  @IsOptional()
  content?: string

  @IsString()
  @IsOptional()
  excerpt?: string

  @IsString()
  @IsOptional()
  coverImage?: string

  @IsBoolean()
  @IsOptional()
  published?: boolean
}
