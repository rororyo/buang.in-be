import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PickupRequest } from 'database/entities/pickup_request.entity';
import { Repository } from 'typeorm';
import { CreatePickupRequestDto } from '../../validator/pickup/pickup_request.dto';

@Injectable()
export class SetorService {
  constructor(
    @InjectRepository(PickupRequest)
    private pickuprequestRepository: Repository<PickupRequest>
  ) {}

  create(createPickupRequestDto: CreatePickupRequestDto): Promise<PickupRequest> {
    const pickuprequest = this.pickuprequestRepository.create(createPickupRequestDto);
    return this.pickuprequestRepository.save(pickuprequest);
  }

  // async postPickupRequest(
  //   name: string,
  //   address: string,
  //   total_weight: number,
  //   img_url: string,
  //   status: Status,
  //   phone_number: string,
  //   pickup_location: string,
  //   pickup_time: Date,
  // ) {
  //   // Create a new item, with category_id directly assigned
  //   const pickuprequest = this.pickuprequestRepository.create({
  //     name: name,
  //     address: address,
  //     total_weight: total_weight,
  //     img_url: img_url,
  //     status: status,
  //     phone_number: phone_number,
  //     pickup_location: pickup_location,
  //     pickup_time: pickup_time,
  //   });

  //   // Save the new item
  //   const data = await this.pickuprequestRepository.save(pickuprequest);

  //   if (!data) throw new NotFoundException('Pickup Request could not be made');

  //   return data;  }
}
