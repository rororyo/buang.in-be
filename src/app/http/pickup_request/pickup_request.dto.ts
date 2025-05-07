import { Status } from "database/entities/enums/status.enum";

export class CreatePickupRequestDto {
    name: string;
    address: string;
    total_weight: number;
    img_url: string;
    status: Status;
    phone_number: string;
    pickup_location: string;
    pickup_time: Date;
}