import { BadRequestException, Body, Controller, Get, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreatePickupRequestDto, SearchPickupRequestDto } from '../../validator/pickup/pickupRequest.dto';
import { SetorService } from './setor.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { Request } from 'express';
import { SearchNearbyTrashBankDto } from 'src/app/validator/trash-bank/trashBank.dto';

@Controller('api/setor')
export class SetorController {
  constructor(private readonly setorService: SetorService) {}

  @UseGuards(JwtAuthGuard)
  @Get('trash-types')
  async getTrashTypes() {
    return this.setorService.getTrashTypes();
  }

  @UseGuards(JwtAuthGuard)
  @Get('sub-districts')
  async getSubDistricts() {
    return this.setorService.getSubDistricts();
  }
  
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: path.resolve(__dirname, '../../../../../public/images/setor'),
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = path.extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createPickupRequestDto: CreatePickupRequestDto,
  ) {
    if (!file) {
      throw new BadRequestException('Image file is required');
    }

    const imageUrl = `/images/setor/${file.filename}`;

    const pickupRequest = await this.setorService.createPickupRequest({
      ...createPickupRequestDto,
      img_url: imageUrl,
    });
    const trashTypeJson = JSON.parse(createPickupRequestDto.trash_type_ids);
    await this.setorService.createPickupRequestTrashType(pickupRequest.id, trashTypeJson);
    return {
      status: 'success',
      message: 'Pickup Request created successfully',
      data: {
        ...createPickupRequestDto,
        img_url: imageUrl,
      },
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('nearby-trash-banks')
  async getNearbyTrashBanks(@Query() searchNearbyTrashBankDto: SearchNearbyTrashBankDto) {
    const { lat, lon } = searchNearbyTrashBankDto;
    if (!lat || !lon) {
      throw new BadRequestException('Latitude and longitude are required in the query parameters');
    }
    const result = await this.setorService.getNearbyTrashBanks({ lat, lon }, searchNearbyTrashBankDto.page, searchNearbyTrashBankDto.limit);
    return {
      status: 'success',
      message: 'Nearby trash banks fetched successfully',
      data: result.data,
      paging: result.metadata
    }
  }

}

