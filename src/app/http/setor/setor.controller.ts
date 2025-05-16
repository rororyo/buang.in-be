import { BadRequestException, Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreatePickupRequestDto } from '../../validator/pickup/pickup_request.dto';
import { SetorService } from './setor.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

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

    await this.setorService.create({
      ...createPickupRequestDto,
      img_url: imageUrl,
    });

    return {
      status: 'success',
      message: 'Pickup Request created successfully',
      data: {
        ...createPickupRequestDto,
        img_url: imageUrl,
      },
    };
  }
}
