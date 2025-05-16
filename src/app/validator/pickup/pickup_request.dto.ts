import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { Status } from 'database/entities/enums/status.enum';

export class CreatePickupRequestDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  total_weight: number;

  @IsString()
  img_url: string;

  @IsNotEmpty()
  @IsEnum(Status)
  @IsString()
  status: Status;

  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @IsNotEmpty()
  @IsString()
  latitude: string;

  @IsNotEmpty()
  @IsString()
  longitude: string;

  @IsNotEmpty()
  @IsDate()
  @IsNotEmpty()
  pickup_time: Date;

  @IsNotEmpty()
  @IsUUID()
  user_id: string;

  @IsNotEmpty()
  @IsUUID()
  trash_bank_id: string;

  @IsNotEmpty()
  @Transform(({ value }) => JSON.parse(value))
  @IsArray()
  @IsUUID('all', { each: true })
  trash_type_ids: string;
}

export class SearchPickupRequestDto {
  @IsUUID()
  user_id: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  page: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  limit: number;
}