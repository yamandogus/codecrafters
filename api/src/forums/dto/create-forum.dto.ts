import { IsString, IsNotEmpty, IsBoolean, IsOptional } from "class-validator"

export class CreateForumDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsBoolean()
  @IsOptional()
  isLocked?: boolean = false

  @IsBoolean()
  @IsOptional()
  isPinned?: boolean = false
}
