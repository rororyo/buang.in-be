import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'database/entities/user.entity';
import { Repository } from 'typeorm';
import { PointExchangeRequest } from 'database/entities/point_exchange_request.entity';
import {
  AcceptOrRejectPointExchangeDto,
  PostPointExchangeDto,
} from 'src/app/validator/point-exchange/pointExchange.dto';

@Injectable()
export class PointExchangeService {
  constructor(
    @InjectRepository(PointExchangeRequest)
    private pointExchangeRepository: Repository<PointExchangeRequest>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getPointExchangeRequests() {
    return this.pointExchangeRepository.find({
      relations: { user: true },
    });
  }

  async postPointExchangeRequest(data: PostPointExchangeDto) {
    return this.pointExchangeRepository.save(data);
  }

  async acceptOrRejectPointExchange(data: AcceptOrRejectPointExchangeDto) {
    const pointExchangeRequest = await this.pointExchangeRepository.findOne({
      where: { id: data.point_exchange_id },
      relations: { user: true }, // ✅ include the related user
    });

    if (!pointExchangeRequest) {
      throw new NotFoundException('Point exchange request not found');
    }

    if (data.status === 'accepted') {
      const user = pointExchangeRequest.user;

      if (!user) throw new NotFoundException('User not found');
      if (user.points < pointExchangeRequest.total_points) {
        throw new BadRequestException('Insufficient points');
      }

      user.points -= pointExchangeRequest.total_points;

      await this.userRepository.save(user);
      await this.pointExchangeRepository.update(
        { id: data.point_exchange_id },
        { status: data.status },
      );
    } else if (data.status === 'rejected') {
      await this.pointExchangeRepository.update(
        { id: data.point_exchange_id },
        { status: data.status },
      );
    } else {
      throw new BadRequestException('Status must be accepted or rejected');
    }
  }
}
