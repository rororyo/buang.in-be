import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PickupRequest } from 'database/entities/pickup_request.entity';
import { Repository } from 'typeorm';
import { CreatePickupRequestDto, SearchPickupRequestDto } from '../../validator/pickup/pickup_request.dto';
import { PickupRequestsTrashType } from 'database/entities/pickup_request_trash_type.entity';

@Injectable()
export class SetorService {
  constructor(
    @InjectRepository(PickupRequest)
    private pickuprequestRepository: Repository<PickupRequest>,
    @InjectRepository(PickupRequestsTrashType)
    private pickupRequestsTrashTypeRepository: Repository<PickupRequestsTrashType>
  ) {}

 async createPickupRequest(createPickupRequestDto: CreatePickupRequestDto): Promise<PickupRequest> {
    const { latitude,longitude, ...rest } = createPickupRequestDto;
    let point: any = undefined;
    if (latitude && longitude) {
      point = {
        type: 'Point',
        coordinates: [parseFloat(longitude), parseFloat(latitude)],
      };
    }
    const pickuprequest = this.pickuprequestRepository.create({
      ...rest,
      pickup_location: point,
    });
    return this.pickuprequestRepository.save(pickuprequest);
  }

async createPickupRequestTrashType(pickupRequestId: string, trashTypeIds: string[]) {
  const values = trashTypeIds.map((trashTypeId) => ({
    pickupRequestId,
    trashTypeId,
  }));

  await this.pickupRequestsTrashTypeRepository.insert(values);
}

async searchPickupRequest(query:SearchPickupRequestDto):Promise<PickupRequest[]>{
  const {user_id} = query;
  let {page,limit} = query
  page = page || 1;
  limit = limit || 10;
  const skip = (page - 1) * limit;
  return await this.pickuprequestRepository.find({where:{user_id:user_id},take:limit,skip:skip});
}
}
