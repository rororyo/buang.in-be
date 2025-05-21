import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PickupRequest } from 'database/entities/pickup_request.entity';
import { PageMetadata } from 'src/app/validator/pagination/pageMetadata.dto';
import { SearchPickupRequestDto } from 'src/app/validator/pickup/pickupRequest.dto';
import { Repository } from 'typeorm';

@Injectable()
export class RiwayatService {
  constructor(
    @InjectRepository(PickupRequest)
    private pickuprequestRepository: Repository<PickupRequest>
  ) {}

async searchPickupRequest(query: SearchPickupRequestDto): Promise<{
  metadata: PageMetadata;
  data: PickupRequest[];
}> {
  const { user_id } = query;
  let { page, limit } = query;
  page = page || 1;
  limit = limit || 10;
  const skip = (page - 1) * limit;

  // Get the data
  const [data, total] = await this.pickuprequestRepository.findAndCount({
    where: { user_id },
    order: { created_at: 'DESC' },
    take: limit,
    skip: skip,
  });

  const total_page = Math.ceil(total / limit);

  return {
    metadata: {
      page,
      size: limit,
      total_item: total,
      total_page: total_page,
    },
    data: data,
  };
}

async getPickupRequest(pickupRequestId: string): Promise<PickupRequest> {
  const pickupRequest = await this.pickuprequestRepository.findOne({
    where: { id: pickupRequestId },
    relations: {
      user: true,
      trashBank: true
    }
  });
  
  if (!pickupRequest) {
    throw new NotFoundException('Pickup request not found');
  }
  
  return pickupRequest;
}

}
