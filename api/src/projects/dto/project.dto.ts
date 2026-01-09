import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsArray, IsEnum } from "class-validator"

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsEnum(["WEB", "MOBILE", "BACKEND", "AI", "DEVOPS", "OTHER"])
  @IsNotEmpty()
  category: string

  @IsString()
  @IsOptional()
  image?: string

  @IsArray()
  @IsString({ each: true })
  tech: string[]

  @IsString()
  @IsOptional()
  demo?: string

  @IsString()
  @IsOptional()
  github?: string

  @IsBoolean()
  @IsOptional()
  featured?: boolean
}

export class UpdateProjectDto {
  @IsString()
  @IsOptional()
  title?: string

  @IsString()
  @IsOptional()
  description?: string

  @IsEnum(["WEB", "MOBILE", "BACKEND", "AI", "DEVOPS", "OTHER"])
  @IsOptional()
  category?: string

  @IsString()
  @IsOptional()
  image?: string

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tech?: string[]

  @IsString()
  @IsOptional()
  demo?: string

  @IsString()
  @IsOptional()
  github?: string

  @IsBoolean()
  @IsOptional()
  featured?: boolean

  @IsBoolean()
  @IsOptional()
  isActive?: boolean
}

export class ProjectQueryDto {
  @IsOptional()
  page?: number

  @IsOptional()
  limit?: number

  @IsOptional()
  category?: string

  @IsOptional()
  featured?: string

  @IsOptional()
  search?: string
}
