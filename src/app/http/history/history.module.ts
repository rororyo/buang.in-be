import { Module } from '@nestjs/common';
import { HistoryController } from './history.controller';
// import { adminService } from './admin.service';
// import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PickupRequest } from 'database/entities/pickup_request.entity';
import { HistoryService } from './history.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PickupRequest
    ])
  ],
  controllers: [HistoryController],
  providers: [HistoryService]
})
export class HistoryModule {}
