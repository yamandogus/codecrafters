import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsArray, IsEnum } from "class-validator"

export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsString()
  @IsNotEmpty()
  company: string

  @IsString()
  @IsOptional()
  logo?: string

  @IsString()
  @IsNotEmpty()
  location: string

  @IsEnum(["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP", "FREELANCE"])
  @IsNotEmpty()
  type: string

  @IsString()
  @IsOptional()
  salary?: string

  @IsString()
  @IsOptional()
  experience?: string

  @IsEnum(["FRONTEND", "BACKEND", "FULLSTACK", "MOBILE", "DEVOPS", "DATA", "OTHER"])
  @IsNotEmpty()
  category: string

  @IsArray()
  @IsString({ each: true })
  skills: string[]

  @IsBoolean()
  @IsOptional()
  isRemote?: boolean

  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean

  @IsArray()
  @IsString({ each: true })
  requirements: string[]

  @IsArray()
  @IsString({ each: true })
  responsibilities: string[]

  @IsArray()
  @IsString({ each: true })
  benefits: string[]

  @IsString()
  @IsOptional()
  companyDescription?: string

  @IsString()
  @IsOptional()
  companyEmployees?: string

  @IsString()
  @IsOptional()
  companyIndustry?: string

  @IsString()
  @IsOptional()
  companyFounded?: string

  @IsString()
  @IsOptional()
  companyWebsite?: string
}

export class UpdateJobDto {
  @IsString()
  @IsOptional()
  title?: string

  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsOptional()
  company?: string

  @IsString()
  @IsOptional()
  logo?: string

  @IsString()
  @IsOptional()
  location?: string

  @IsEnum(["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP", "FREELANCE"])
  @IsOptional()
  type?: string

  @IsString()
  @IsOptional()
  salary?: string

  @IsString()
  @IsOptional()
  experience?: string

  @IsEnum(["FRONTEND", "BACKEND", "FULLSTACK", "MOBILE", "DEVOPS", "DATA", "OTHER"])
  @IsOptional()
  category?: string

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  skills?: string[]

  @IsBoolean()
  @IsOptional()
  isRemote?: boolean

  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean

  @IsEnum(["ACTIVE", "INACTIVE", "CLOSED"])
  @IsOptional()
  status?: string

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  requirements?: string[]

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  responsibilities?: string[]

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  benefits?: string[]

  @IsString()
  @IsOptional()
  companyDescription?: string

  @IsString()
  @IsOptional()
  companyEmployees?: string

  @IsString()
  @IsOptional()
  companyIndustry?: string

  @IsString()
  @IsOptional()
  companyFounded?: string

  @IsString()
  @IsOptional()
  companyWebsite?: string
}

export class JobQueryDto {
  @IsOptional()
  page?: number

  @IsOptional()
  limit?: number

  @IsOptional()
  category?: string

  @IsOptional()
  type?: string

  @IsOptional()
  isRemote?: string

  @IsOptional()
  search?: string

  @IsOptional()
  status?: string
}

export class JobApplicationDto {
  @IsString()
  @IsNotEmpty()
  firstName: string

  @IsString()
  @IsNotEmpty()
  lastName: string

  @IsString()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsOptional()
  phone?: string

  @IsString()
  @IsOptional()
  portfolio?: string

  @IsString()
  @IsOptional()
  linkedin?: string

  @IsString()
  @IsOptional()
  github?: string

  @IsString()
  @IsNotEmpty()
  experience: string

  @IsString()
  @IsNotEmpty()
  skills: string

  @IsString()
  @IsOptional()
  coverLetter?: string

  @IsString()
  @IsOptional()
  resume?: string

  @IsString()
  @IsOptional()
  availability?: string

  @IsString()
  @IsOptional()
  salary?: string
}
