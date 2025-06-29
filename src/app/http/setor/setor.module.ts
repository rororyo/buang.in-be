import { Module } from '@nestjs/common';
import { SetorController } from './setor.controller';
// import { adminService } from './admin.service';
// import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PickupRequest } from 'database/entities/pickup_request.entity';
import { SetorService } from './setor.service';
import { PickupRequestsTrashType } from 'database/entities/pickup_request_trash_type.entity';
import { User } from 'database/entities/user.entity';
import { TrashType } from 'database/entities/trash_type.entity';
import { SubDistrict } from 'database/entities/sub_district.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PickupRequest,
      PickupRequestsTrashType,
      User,
      TrashType,
      SubDistrict
    ])
  ],
  controllers: [SetorController],
  providers: [SetorService]
})
export class SetorModule {}
