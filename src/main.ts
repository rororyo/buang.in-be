import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());

  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
    methods: 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  });
  const staticAssetsPath = join(__dirname, '../..', 'public');
  console.log(`Static assets path: ${staticAssetsPath}`);
  app.useStaticAssets(staticAssetsPath);
  await app.listen(5000);
}
bootstrap();
