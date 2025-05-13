import { Module } from '@nestjs/common';
// import { adminService } from './admin.service';
// import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PickupRequest } from 'database/entities/pickup_request.entity';
import { RiwayatController } from './riwayat.controller';
import { RiwayatService } from './riwayat.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PickupRequest
    ])
  ],
  controllers: [RiwayatController],
  providers: [RiwayatService]
})
export class RiwayatModule {}
