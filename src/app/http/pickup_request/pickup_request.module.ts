import { Module } from '@nestjs/common';
import { PickupRequestController } from './pickup_request.controller';
// import { adminService } from './admin.service';
// import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PickupRequest } from 'database/entities/pickup_request.entity';
import { PickupRequestService } from './pickup_request.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PickupRequest
    ])
  ],
  controllers: [PickupRequestController],
  providers: [PickupRequestService]
})
export class PickupRequestModule {}
