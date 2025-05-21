import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PickupRequest } from 'database/entities/pickup_request.entity';
import { Repository } from 'typeorm';
import {
  CreatePickupRequestDto,
  SearchPickupRequestDto,
} from '../../validator/pickup/pickupRequest.dto';
import { PickupRequestsTrashType } from 'database/entities/pickup_request_trash_type.entity';
import { User } from 'database/entities/user.entity';
import { TrashType } from 'database/entities/trash_type.entity';
import { PageMetadata } from 'src/app/validator/pagination/pageMetadata.dto';

@Injectable()
export class SetorService {
  constructor(
    @InjectRepository(PickupRequest)
    private pickuprequestRepository: Repository<PickupRequest>,
    @InjectRepository(PickupRequestsTrashType)
    private pickupRequestsTrashTypeRepository: Repository<PickupRequestsTrashType>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(TrashType)
    private trashTypeRepository: Repository<TrashType>,
  ) {}

  async createPickupRequest(
    createPickupRequestDto: CreatePickupRequestDto,
  ): Promise<PickupRequest> {
    const { latitude, longitude, ...rest } = createPickupRequestDto;
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

  async createPickupRequestTrashType(
    pickupRequestId: string,
    trashTypeIds: string[],
  ) {
    const values = trashTypeIds.map((trashTypeId) => ({
      pickupRequestId,
      trashTypeId,
    }));

    await this.pickupRequestsTrashTypeRepository.insert(values);
  }

async getNearbyTrashBanks(
  pickupLocation: { lat: number; lon: number },
  page = 1,
  limit = 10
): Promise<{
  metadata: PageMetadata;
  data: User[];
}> {
  const { lat, lon } = pickupLocation;
  const offset = (page - 1) * limit;

  // Get total count of all trash banks (no distance limit)
  const countResult = await this.userRepository.query(
    `
    SELECT COUNT(*) AS total
    FROM "users"
    WHERE role = 'trash_bank'
      AND location IS NOT NULL
    `,
    []
  );

  const total = parseInt(countResult[0]?.total || '0');
  const total_page = Math.ceil(total / limit);

  // Get paginated data sorted by distance (without radius limit)
  const data = await this.userRepository.query(
    `
    SELECT *,
      ROUND(ST_Distance(location::geography, ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography)) AS distance
    FROM "users"
    WHERE role = 'trash_bank'
      AND location IS NOT NULL
    ORDER BY distance ASC
    LIMIT $3 OFFSET $4
    `,
    [lon, lat, limit, offset]
  );

  return {
    metadata: {
      page,
      size: limit,
      total_item: total,
      total_page: total_page,
    },
    data,
  };
}

  async getTrashTypes() {
    const trashTypes = await this.trashTypeRepository.find();
    return trashTypes;
  }
}
