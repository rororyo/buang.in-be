import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ArrayMinSize,
  Min,
} from 'class-validator';

export class CreateCompleteRequestDto {
  @IsNotEmpty()
  @IsUUID()
  pickup_request_id: string;

  @IsNotEmpty()
  @Transform(({ value }) => JSON.parse(value))
  @IsArray()
  @ArrayMinSize(1)
  @IsUUID('all', { each: true })
  trash_type_ids: string;

  @IsNotEmpty()
  @Transform(({ value }) => JSON.parse(value))
  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  @Min(0.01, { each: true, message: 'Weight must be greater than 0' })
  weights: number;
}

export class CreateTrashDetailDto {
  @IsNotEmpty()
  @IsUUID()
  pickup_request_id: string;

  @IsString()
  photo_url: string;
}

export class CompleteRequestDto {
  @IsNotEmpty()
  @IsUUID()
  pickup_request_id: string;

  @IsNotEmpty()
  @IsString()
  photo_url: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsUUID('all', { each: true })
  trash_type_ids: string[];

  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  @Min(0.01, { each: true })
  weights: number[];
}

export class AcceptOrRejectRequestDto {
  @IsNotEmpty()
  @IsUUID()
  pickup_request_id: string;

  @IsNotEmpty()
  @IsString()
  status: string;
}

export class SearchTrashBankPickupRequestDto {
  @IsString()
  status: string;

  @IsString()
  orderBy: 'asc' | 'desc';

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
