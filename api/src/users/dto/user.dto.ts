import { IsString, IsOptional, IsBoolean, IsEnum } from "class-validator"

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  surname?: string

  @IsString()
  @IsOptional()
  bio?: string

  @IsString()
  @IsOptional()
  avatar?: string

  @IsString()
  @IsOptional()
  coverImage?: string

  @IsString()
  @IsOptional()
  location?: string

  @IsString()
  @IsOptional()
  phone?: string

  @IsString()
  @IsOptional()
  github?: string

  @IsString()
  @IsOptional()
  linkedin?: string

  @IsString()
  @IsOptional()
  twitter?: string

  @IsString()
  @IsOptional()
  website?: string

  @IsBoolean()
  @IsOptional()
  isMentor?: boolean
}

export class AddSkillDto {
  @IsString()
  name: string

  @IsEnum(["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"])
  level: string

  @IsString()
  @IsOptional()
  color?: string
}

export class AddExperienceDto {
  @IsString()
  title: string

  @IsString()
  company: string

  @IsString()
  startDate: string

  @IsString()
  @IsOptional()
  endDate?: string

  @IsString()
  @IsOptional()
  description?: string
}

export class AddEducationDto {
  @IsString()
  school: string

  @IsString()
  degree: string

  @IsString()
  field: string

  @IsString()
  startDate: string

  @IsString()
  @IsOptional()
  endDate?: string

  @IsString()
  @IsOptional()
  description?: string
}

export class UserQueryDto {
  @IsOptional()
  page?: number

  @IsOptional()
  limit?: number

  @IsOptional()
  role?: string

  @IsOptional()
  isMentor?: string

  @IsOptional()
  search?: string
}
