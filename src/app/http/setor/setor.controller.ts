import { BadRequestException, Body, Controller, Get, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreatePickupRequestDto, SearchPickupRequestDto } from '../../validator/pickup/pickup_request.dto';
import { SetorService } from './setor.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { Request } from 'express';

@Controller('api/setor')
export class SetorController {
  constructor(private readonly setorService: SetorService) {}

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
@Get()
async search(@Query() query: SearchPickupRequestDto, @Req() req: Request) {
  if (!req.user || typeof req.user !== 'object' || !('userId' in req.user)) {
    throw new BadRequestException('User information is missing from request');
  }

  const user = req.user as { userId: string };
  query.user_id = user.userId;
  return await this.setorService.searchPickupRequest(query);
}
}

