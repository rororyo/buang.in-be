import { BadRequestException, Body, Controller, Get, Param, Put, Req, UseGuards } from '@nestjs/common';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
// import { RolesGuard } from '../auth/guards/roles.guard';
// import { Roles } from '../common/decorators/roles.decorator';
import { User } from 'database/entities/user.entity';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from 'src/app/validator/user/users.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { getAuthCookie } from 'src/utils/auth/get-auth-cookie';
import { Request } from 'express';


@Controller('api/user')
export class ProfileController {
  constructor(
    private readonly profileService:ProfileService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateUserProfile(
    @Body() dto: UpdateProfileDto,
    @Req() req: Request
  ): Promise<User> {
    if (!req.user || typeof req.user !== 'object' || !('userId' in req.user)) {
        throw new BadRequestException('User information is missing from request');
    }
    
      const user = req.user as { userId: string };
    return this.profileService.updateProfile(user.userId, dto);
  }

}
