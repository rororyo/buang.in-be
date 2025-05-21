import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class SearchNearbyTrashBankDto {
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  lat: number;

  @IsNumber()
  @Type(() => Number)
  @Min(1)
  lon: number;

  @IsNumber()
  @Type(() => Number)
  @Min(1)
  page: number;
  
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  limit: number;
}