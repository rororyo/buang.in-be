import { BadRequestException, Body, Controller, Get, Param, Post, Put, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { User } from 'database/entities/user.entity';
import { UpdateProfileDto } from 'src/app/validator/user/users.dto';
import { BankSampahService } from './bankSampah.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { AcceptOrRejectRequestDto, CreateCompleteRequestDto, SearchTrashBankPickupRequestDto } from 'src/app/validator/bank-sampah/bankSampah.dto';
import { Roles } from 'src/app/common/decorators/roles.decorator';
import { Request } from 'express';

@Controller('api/bank-sampah')
export class BankSampahController {
  constructor(private readonly bankSampahService: BankSampahService) {}
  
  @UseGuards(JwtAuthGuard)
  @Post('setor-request/complete')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: path.resolve(__dirname, '../../../../../public/images/bank-sampah'),
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = path.extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async completeRequest(
    @UploadedFile() file: Express.Multer.File,
    @Body() createCompleteRequestDto: CreateCompleteRequestDto,
  ) {
    if (!file) {
      throw new BadRequestException('Image file is required');
    }

    const imageUrl = `/images/bank-sampah/${file.filename}`;

    try {
      // Parse the JSON strings from the DTO
      const trashTypeIds = JSON.parse(createCompleteRequestDto.trash_type_ids);
      const weights = JSON.parse(createCompleteRequestDto.weights.toString());

      // Validate that arrays have the same length
      if (trashTypeIds.length !== weights.length) {
        throw new BadRequestException('Trash type IDs and weights arrays must have the same length');
      }

      // Process the trash acceptance
      const result = await this.bankSampahService.completeTrashRequest({
        pickup_request_id: createCompleteRequestDto.pickup_request_id,
        photo_url: imageUrl,
        trash_type_ids: trashTypeIds,
        weights: weights,
      });

      return {
        status: 'success',
        message: 'Trash request accepted and processed successfully',
        data: result,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to process trash acceptance: ' + error.message);
    }
  }
  @UseGuards(JwtAuthGuard)
  @Post('setor-request/:id')
  async managePickupRequest(@Param('id') id: string,@Query('status') status: string, @Req() req: Request) {
    if(!status) throw new BadRequestException('Status is required');
    if(status !== 'accepted' && status !== 'rejected') throw new BadRequestException('Status must be accepted or rejected');
    const dto = new AcceptOrRejectRequestDto();
    dto.pickup_request_id = id;
    dto.status = status;
    const result = await this.bankSampahService.acceptOrRejectPickupRequest(dto);
    return {
      status: 'success',
      message: 'Pickup request processed successfully',
      data: result
    }
  }

@UseGuards(JwtAuthGuard)
@Roles('trash_bank')
@Get('setor-request')
async fetchPickupRequest(
  @Req() req: Request,
  @Query() searchTrashBankPickupRequestDto: SearchTrashBankPickupRequestDto
) {
  if (!req.user || typeof req.user !== 'object' || !('userId' in req.user)) {
    throw new BadRequestException('User information is missing from request');
  }

  const user = req.user as { userId: string };
  const { page = 1, limit = 10 } = searchTrashBankPickupRequestDto;
  
  const result = await this.bankSampahService.getPickupRequestByTrashBankId(
    user.userId,
    page,
    limit
  );
  
  return {
    status: 'success',
    message: 'Pickup request fetched successfully',
    ...result
  };
}
}


