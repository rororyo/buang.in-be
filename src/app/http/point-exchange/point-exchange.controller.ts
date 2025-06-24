import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
// import { RolesGuard } from '../auth/guards/roles.guard';
// import { Roles } from '../common/decorators/roles.decorator';
import { User } from 'database/entities/user.entity';
import { UpdateProfileDto } from 'src/app/validator/user/users.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { getAuthCookie } from 'src/utils/auth/get-auth-cookie';
import { Request } from 'express';
import { PointExchangeService } from './point-exchange.service';
import { AcceptOrRejectPointExchangeDto, PostPointExchangeDto } from 'src/app/validator/point-exchange/pointExchange.dto';
import { PointExchangeRequest } from 'database/entities/point_exchange_request.entity';
import { AcceptOrRejectRequestDto } from 'src/app/validator/bank-sampah/bankSampah.dto';
import { Status } from 'database/entities/enums/status.enum';

@Controller('api/point-exchange')
export class PointExchangeController {
  constructor(private readonly pointExchangeService: PointExchangeService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  async getPointExchangeRequests() {
    return this.pointExchangeService.getPointExchangeRequests();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPointExchangeRequest(
    @Body() postPointExchangeDto: PostPointExchangeDto,
    @Req() req: Request,
  ): Promise<PointExchangeRequest> {
    if (!req.user || typeof req.user !== 'object' || !('userId' in req.user)) {
      throw new BadRequestException('User information is missing from request');
    }

    const user = req.user as { userId: string };

    // Safely pass all properties + user_id
    return this.pointExchangeService.postPointExchangeRequest({
      ...postPointExchangeDto,
      user_id: user.userId,
    });
  }
    @UseGuards(JwtAuthGuard)
    @Post(':id')
    async managePickupRequest(
      @Param('id') id: string,
      @Query('status') status: string,
      @Req() req: Request,
    ) {
      if (!status) throw new BadRequestException('Status is required');
      if (status !== 'accepted' && status !== 'rejected')
        throw new BadRequestException('Status must be accepted or rejected');

    if (!req.user || typeof req.user !== 'object' || !('userId' in req.user)) {
      throw new BadRequestException('User information is missing from request');
    }
      const dto = new AcceptOrRejectPointExchangeDto();
      dto.point_exchange_id = id;
      dto.status = status as Status;
      const result =
      await this.pointExchangeService.acceptOrRejectPointExchange(dto);
      return result
    }
}
