import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrashDetail } from 'database/entities/trash_detail.entity';
import { TrashDetailTrashType } from 'database/entities/trash_detail_trash_type.entity';
import { TrashType } from 'database/entities/trash_type.entity';
import { User } from 'database/entities/user.entity';
import { BankSampahController } from './bankSampah.controller';
import { BankSampahService } from './bankSampah.service';
import { PickupRequest } from 'database/entities/pickup_request.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TrashType,
      TrashDetailTrashType,
      TrashDetail,
      PickupRequest,
      User
    ])
  ],
  controllers: [BankSampahController],
  providers: [BankSampahService]
})
export class BankSampahModule {}