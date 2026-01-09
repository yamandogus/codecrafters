import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsArray, IsNumber } from "class-validator"

export class CreateLearningResourceDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsString()
  @IsNotEmpty()
  category: string

  @IsString()
  @IsOptional()
  duration?: string

  @IsString()
  @IsOptional()
  level?: string

  @IsNumber()
  @IsOptional()
  rating?: number

  @IsNumber()
  @IsOptional()
  students?: number

  @IsString()
  @IsOptional()
  image?: string

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[]

  @IsString()
  @IsOptional()
  content?: string
}

export class UpdateLearningResourceDto {
  @IsString()
  @IsOptional()
  title?: string

  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsOptional()
  category?: string

  @IsString()
  @IsOptional()
  duration?: string

  @IsString()
  @IsOptional()
  level?: string

  @IsNumber()
  @IsOptional()
  rating?: number

  @IsNumber()
  @IsOptional()
  students?: number

  @IsString()
  @IsOptional()
  image?: string

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[]

  @IsString()
  @IsOptional()
  content?: string

  @IsBoolean()
  @IsOptional()
  isActive?: boolean
}

export class LearningQueryDto {
  @IsOptional()
  page?: number

  @IsOptional()
  limit?: number

  @IsOptional()
  category?: string

  @IsOptional()
  level?: string

  @IsOptional()
  search?: string
}
