import { BadRequestException, Body, Controller, Get, Param, Query, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
// import { RolesGuard } from '../auth/guards/roles.guard';
// import { Roles } from '../common/decorators/roles.decorator';
import { PickupRequest } from 'database/entities/pickup_request.entity';
import { RiwayatService } from './riwayat.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SearchPickupRequestDto } from 'src/app/validator/pickup/pickupRequest.dto';
import { Request } from 'express';

@Controller('api/riwayat')
export class RiwayatController {
  constructor(
    private readonly riwayatService:RiwayatService
  ) {}

@UseGuards(JwtAuthGuard)
@Get()
async search(@Query() query: SearchPickupRequestDto, @Req() req: Request) {
  if (!req.user || typeof req.user !== 'object' || !('userId' in req.user)) {
    throw new BadRequestException('User information is missing from request');
  }

  const user = req.user as { userId: string };
  query.user_id = user.userId;
  const result = await this.riwayatService.searchPickupRequest(query);
  return {
      status: 'success',
      message: 'Riwayat fetched successfully',
      data: result.data,
      paging: result.metadata
  }
}

@UseGuards(JwtAuthGuard)
@Get('/:id')
async getPickupRequest(@Param('id') id: string, @Req() req: Request) {
  const result = await this.riwayatService.getPickupRequest(id);
  return {
      status: 'success',
      message: 'Detail riwayat fetched successfully',
      data: result
  };
}
}
