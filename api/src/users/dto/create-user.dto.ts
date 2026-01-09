import { IsEmail, IsNotEmpty, IsString, IsOptional } from "class-validator"

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  username: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  bio?: string

  @IsString()
  @IsOptional()
  avatar?: string
}
