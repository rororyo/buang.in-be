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
export class SearchPointExchangeDto {
  @IsString()
  status: string
  @IsString()
  orderBy: 'asc' | 'desc'
  @IsString()
  transfer_method: string
}

export class PostPointExchangeDto {

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  total_points: number

  @IsNotEmpty()
  @IsString()
  transfer_method: string

  @IsNotEmpty()
  @IsString()
  account_number: string

  @IsNotEmpty()
  @IsEnum(Status)
  @IsString()
  status: Status;

  @IsString()
  bank_name: string

  @IsString()
  user_id: string
}

export class AcceptOrRejectPointExchangeDto {
  @IsNotEmpty()
  @IsUUID()
  point_exchange_id: string;

  @IsNotEmpty()
  @IsString()
  status: Status;
}