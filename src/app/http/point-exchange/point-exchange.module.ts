import { Module } from '@nestjs/common';
// import { adminService } from './admin.service';
// import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointExchangeRequest } from 'database/entities/point_exchange_request.entity';
import { PointExchangeController } from './point-exchange.controller';
import { PointExchangeService } from './point-exchange.service';
import { User } from 'database/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PointExchangeRequest,
      User
    ])
  ],
  controllers: [PointExchangeController],
  providers: [PointExchangeService]
})
export class PointExchangeModule {}
