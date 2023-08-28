import { join } from 'path'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { TypeOrmDefaultConfigService } from './common/providers/typeorm.config.service'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CouponModule } from './coupon/coupon.module'
import { AuthModule } from './auth/auth.module'
import { UploadModule } from './upload/upload.module';

const NODE_ENV = process.env.NODE_ENV || 'development'
const envFilePath = join(__dirname, `../env/.env.${NODE_ENV}`)
console.log('执行环境', NODE_ENV, '环境配置文件', envFilePath)

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmDefaultConfigService,
      inject: [ConfigService]
    }),
    CouponModule,
    AuthModule,
    UploadModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
