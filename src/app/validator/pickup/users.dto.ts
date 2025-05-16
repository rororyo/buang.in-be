import { IsDateString, IsEmail, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { Roles } from "database/entities/enums/roles.enum";


export class UpdateProfileDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  username?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password?: string;

  @IsOptional()
  @IsString()
  role?: Roles;

  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsDateString()
  birthday?: Date;
  
  @IsOptional()
  @IsString()
  phoneNumber?: string;
  
  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsNumber()
  points?: number;
}