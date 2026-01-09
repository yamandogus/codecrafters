import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, IsOptional } from "class-validator"

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(20)
  username?: string

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string

  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsOptional()
  surname?: string

  // Frontend'den gelen confirmPassword'ü kabul et ama validate etme
  @IsString()
  @IsOptional()
  confirmPassword?: string
}
