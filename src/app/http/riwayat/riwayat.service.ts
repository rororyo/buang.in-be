import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PickupRequest } from 'database/entities/pickup_request.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RiwayatService {
  constructor(
    @InjectRepository(PickupRequest)
    private pickuprequestRepository: Repository<PickupRequest>
  ) {}

  async findAll(): Promise<PickupRequest[]> {
    return await this.pickuprequestRepository.find();
  }
}
