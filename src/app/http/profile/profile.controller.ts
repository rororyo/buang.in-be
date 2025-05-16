import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
// import { RolesGuard } from '../auth/guards/roles.guard';
// import { Roles } from '../common/decorators/roles.decorator';
import { User } from 'database/entities/user.entity';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from 'src/app/validator/pickup/users.dto';


@Controller('api/user')
export class ProfileController {
  constructor(
    private readonly profileService:ProfileService
  ) {}

  @Put(':id')
  updateUserProfile(
    @Param('id') id: string,
    @Body() dto: UpdateProfileDto,
  ): Promise<User> {
    return this.profileService.updateProfile(id, dto);
  }
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  // @Post('pickup_request')
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
