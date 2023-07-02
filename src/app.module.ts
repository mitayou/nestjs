import { join } from 'path'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { TypeOrmDefaultConfigService } from './common/providers/typeorm.config.service'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CouponModule } from './coupon/coupon.module'
import { AuthModule } from './auth/auth.module'

const NODE_ENV = process.env.NODE_ENV || 'development'
console.log('执行环境', NODE_ENV)

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(__dirname, `../env/.env.${NODE_ENV}`),
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmDefaultConfigService,
      inject: [ConfigService]
    }),
    CouponModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
