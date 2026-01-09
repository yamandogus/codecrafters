import { IsString, IsBoolean, IsOptional } from "class-validator"

export class UpdateForumDto {
  @IsString()
  @IsOptional()
  title?: string

  @IsString()
  @IsOptional()
  description?: string

  @IsBoolean()
  @IsOptional()
  isLocked?: boolean

  @IsBoolean()
  @IsOptional()
  isPinned?: boolean
}
