import { Body, Controller, Post, UseGuards } from '@nestjs/common';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
// import { RolesGuard } from '../auth/guards/roles.guard';
// import { Roles } from '../common/decorators/roles.decorator';
// import { Status } from 'database/entities/enums/status.enum';
import { CreatePickupRequestDto } from '../../validator/pickup/pickup_request.dto';
import { PickupRequest } from 'database/entities/pickup_request.entity';
import { SetorService } from './setor.service';

@Controller('api/pickup_request')
export class SetorController {
  constructor(
    private readonly setorService:SetorService
  ) {}

  @Post()
  create(@Body() createPickupRequestDto: CreatePickupRequestDto): Promise<PickupRequest> {
    return this.setorService.create(createPickupRequestDto);
  }
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  // @Post('setor')
  // async postPickupRequest(
  //   @Body('request_name') name:string,
  //   @Body('pickup_address')address: string,
  //   @Body('trash_weight')total_weight: number,
  //   @Body('img_path')img_url: string,
  //   @Body('pickup_status')status: Status,
  //   @Body('request_phone_number')phone_number: string,
  //   @Body('request_location')pickup_location: string,
  //   @Body('request_time')pickup_time: Date,
  // ) {
  //    await this.pickupRequestService.postPickupRequest(
  //     name,address,total_weight,img_url,status,phone_number,pickup_location,pickup_time
  //   )
  //   return{
  //     status:'success',
  //     message:'Pickup Request created successfully',
  //   }
  // }
}
