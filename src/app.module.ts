import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './app/http/auth/auth.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: (): TypeOrmModuleOptions => {
        const isProduction = process.env.NODE_ENV === 'PRODUCTION';
        const config: TypeOrmModuleOptions = {
          type: 'postgres',
          url: isProduction ? process.env.DATABASE_URL : undefined,
          entities: isProduction
            ? ['dist/database/entities/*.entity{.ts,.js}']
            : ['dist/database/entities/*.entity.js'],
          synchronize: true,
          ssl: isProduction
            ? (process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false)
            : false,
          ...(isProduction
            ? {}
            : {
                host: process.env.DB_HOST || 'localhost',
                port: parseInt(process.env.DB_PORT || '5432'),
                username: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
              }),
        };
    
        console.log('🛠️ Final DB Config:', config); // 👈 this will show what TypeORM sees
        return config;
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

