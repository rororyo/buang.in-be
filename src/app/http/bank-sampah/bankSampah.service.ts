import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from 'database/entities/enums/status.enum';
import { PickupRequest } from 'database/entities/pickup_request.entity';
import { TrashDetail } from 'database/entities/trash_detail.entity';
import { TrashDetailTrashType } from 'database/entities/trash_detail_trash_type.entity';
import { TrashType } from 'database/entities/trash_type.entity';
import { User } from 'database/entities/user.entity';
import { AcceptOrRejectRequestDto, CompleteRequestDto, CreateTrashDetailDto } from 'src/app/validator/bank-sampah/bankSampah.dto';
import { PageMetadata } from 'src/app/validator/pagination/pageMetadata.dto';
import { SearchPickupRequestDto } from 'src/app/validator/pickup/pickupRequest.dto';
import { Repository, DataSource } from 'typeorm';

@Injectable()
export class BankSampahService {
  constructor(
    @InjectRepository(PickupRequest)
    private pickupRequestRepository: Repository<PickupRequest>,
    @InjectRepository(TrashType)
    private trashTypeRepository: Repository<TrashType>,
    @InjectRepository(TrashDetailTrashType)
    private trashDetailTrashTypeRepository: Repository<TrashDetailTrashType>,
    @InjectRepository(TrashDetail)
    private trashDetailRepository: Repository<TrashDetail>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private dataSource: DataSource,
  ) {}

  async createTrashDetail(createTrashDetailDto: CreateTrashDetailDto) {
    const { pickup_request_id } = createTrashDetailDto;
    const pickupRequest = await this.pickupRequestRepository.findOneBy({ id: pickup_request_id });
    if (!pickupRequest) {
      throw new NotFoundException('Pickup request not found');
    }
    const trashDetail = this.trashDetailRepository.create(createTrashDetailDto);
    await this.trashDetailRepository.save(trashDetail);
    return trashDetail;
  }

  async completeTrashRequest(completeTrashRequestDto: CompleteRequestDto) {
    const { pickup_request_id, photo_url, trash_type_ids, weights } = completeTrashRequestDto;
    
    // Start a transaction to ensure data consistency
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. Verify pickup request exists and is in valid state
      const pickupRequest = await queryRunner.manager.findOne(PickupRequest, {
        where: { id: pickup_request_id },
        relations: ['user'] // Include user relation to get user info
      });

      if (!pickupRequest) {
        throw new NotFoundException('Pickup request not found');
      }

      if (pickupRequest.status === Status.completed) {
        throw new BadRequestException('Pickup request is already completed');
      }

      if (!pickupRequest.user) {
        throw new NotFoundException('User associated with pickup request not found');
      }

      // 2. Verify all trash types exist
      const trashTypes = await queryRunner.manager.findByIds(TrashType, trash_type_ids);
      if (trashTypes.length !== trash_type_ids.length) {
        throw new BadRequestException('One or more trash types not found');
      }

      // 3. Create trash detail record
      const trashDetail = queryRunner.manager.create(TrashDetail, {
        pickup_request_id,
        photo_url,
        points: 0, // Will be calculated and updated later
        created_at: new Date(),
      });

      const savedTrashDetail = await queryRunner.manager.save(TrashDetail, trashDetail);

      // 4. Create trash detail - trash type relationships and calculate total points
      let totalPoints = 0;
      const trashDetailTrashTypes: TrashDetailTrashType[] = [];

      for (let i = 0; i < trash_type_ids.length; i++) {
        const weight = weights[i];
        const trash_type_id = trash_type_ids[i];

        // Validate weight is positive
        if (weight <= 0) {
          throw new BadRequestException(`Weight must be positive for trash type ${trash_type_id}`);
        }

        // Calculate points (weight * 1000 as per requirement)
        const points = weight * 1000;
        totalPoints += points;

        // Create trash detail - trash type relationship
        const trashDetailTrashType = queryRunner.manager.create(TrashDetailTrashType, {
          trash_detail_id: savedTrashDetail.id,
          trash_type_id,
          weight,
        });

        trashDetailTrashTypes.push(trashDetailTrashType);
      }

      // Save all trash detail - trash type relationships
      await queryRunner.manager.save(TrashDetailTrashType, trashDetailTrashTypes);

      // 5. Update trash detail with calculated points
      await queryRunner.manager.update(TrashDetail, savedTrashDetail.id, {
        points: totalPoints,
      });

      // 6. Update pickup request status to completed
      await queryRunner.manager.update(PickupRequest, pickup_request_id, {
        status: Status.completed,
      });

      // 7. Update user's points
      await queryRunner.manager.increment(
        User,
        { id: pickupRequest.user.id },
        'points',
        totalPoints
      );

      // Commit the transaction
      await queryRunner.commitTransaction();

      // Return the complete result
      const result = {
        trash_detail_id: savedTrashDetail.id,
        pickup_request_id,
        photo_url,
        total_points: totalPoints,
        user_id: pickupRequest.user.id,
        user_points_updated: totalPoints,
        trash_items: trashDetailTrashTypes.map((item, index) => ({
          trash_type_id: item.trash_type_id,
          weight: item.weight,
          points: weights[index] * 1000,
        })),
      };

      return result;

    } catch (error) {
      // Rollback the transaction in case of error
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // Release the query runner
      await queryRunner.release();
    }
  }
  async acceptOrRejectPickupRequest(acceptOrRejectRequestDto: AcceptOrRejectRequestDto) {
    const { pickup_request_id, status } = acceptOrRejectRequestDto;
    const pickupRequest = await this.pickupRequestRepository.findOneBy({ id: pickup_request_id });
    if (!pickupRequest) {
      throw new NotFoundException('Pickup request not found');
    }
    if (pickupRequest.status === Status.completed) {
      throw new BadRequestException('Pickup request is already completed');
    }
    if (status == Status.accepted) {
      pickupRequest.status = Status.accepted;
      await this.pickupRequestRepository.save(pickupRequest);
      return pickupRequest;
    }
    if(status == Status.rejected) {
      pickupRequest.status = Status.rejected;
      await this.pickupRequestRepository.save(pickupRequest);
      return pickupRequest;
    }
  }
async getPickupRequestByTrashBankId(trashBankId: string, page: number = 1, limit: number = 10) {
  page = page || 1;
  limit = limit || 10;
  const skip = (page - 1) * limit;

  // Get the data with count
  const [data, total] = await this.pickupRequestRepository.findAndCount({
    where: { trash_bank_id: trashBankId },
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
}