import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsArray, IsEnum, IsDate, IsNumber } from "class-validator"
import { Type } from "class-transformer"

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsString()
  @IsOptional()
  longDescription?: string

  @IsEnum(["HACKATHON", "WORKSHOP", "MEETUP", "CONFERENCE", "WEBINAR", "OTHER"])
  @IsNotEmpty()
  category: string

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  startDate: Date

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  endDate: Date

  @IsString()
  @IsNotEmpty()
  location: string

  @IsString()
  @IsOptional()
  address?: string

  @IsBoolean()
  @IsOptional()
  isOnline?: boolean

  @IsNumber()
  @IsOptional()
  maxParticipants?: number

  @IsString()
  @IsNotEmpty()
  organizer: string

  @IsString()
  @IsOptional()
  organizerEmail?: string

  @IsString()
  @IsOptional()
  organizerPhone?: string

  @IsString()
  @IsOptional()
  organizerWebsite?: string

  @IsString()
  @IsOptional()
  organizerDescription?: string

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[]

  @IsString()
  @IsOptional()
  image?: string

  @IsString()
  @IsOptional()
  price?: string

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  requirements?: string[]
}

export class UpdateEventDto {
  @IsString()
  @IsOptional()
  title?: string

  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsOptional()
  longDescription?: string

  @IsEnum(["HACKATHON", "WORKSHOP", "MEETUP", "CONFERENCE", "WEBINAR", "OTHER"])
  @IsOptional()
  category?: string

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  startDate?: Date

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  endDate?: Date

  @IsString()
  @IsOptional()
  location?: string

  @IsString()
  @IsOptional()
  address?: string

  @IsBoolean()
  @IsOptional()
  isOnline?: boolean

  @IsNumber()
  @IsOptional()
  maxParticipants?: number

  @IsString()
  @IsOptional()
  organizer?: string

  @IsString()
  @IsOptional()
  organizerEmail?: string

  @IsString()
  @IsOptional()
  organizerPhone?: string

  @IsString()
  @IsOptional()
  organizerWebsite?: string

  @IsString()
  @IsOptional()
  organizerDescription?: string

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[]

  @IsString()
  @IsOptional()
  image?: string

  @IsEnum(["UPCOMING", "ONGOING", "COMPLETED", "CANCELLED"])
  @IsOptional()
  status?: string

  @IsString()
  @IsOptional()
  price?: string

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  requirements?: string[]
}

export class EventQueryDto {
  @IsOptional()
  page?: number

  @IsOptional()
  limit?: number

  @IsOptional()
  category?: string

  @IsOptional()
  status?: string

  @IsOptional()
  isOnline?: string

  @IsOptional()
  search?: string
}

export class EventRegistrationDto {
  @IsString()
  @IsOptional()
  experience?: string

  @IsString()
  @IsOptional()
  motivation?: string
}
