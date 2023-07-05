import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { join } from 'path'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TypeOrmDefaultConfigService } from './common/providers/typeorm.config.service'
import { CouponModule } from './coupon/coupon.module'
import { AuthModule } from './auth/auth.module'
import { INestApplication } from '@nestjs/common'

describe('AppController', () => {
  let appController: AppController
  let app: INestApplication

  const NODE_ENV = process.env.NODE_ENV || 'development'

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
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
    }).compile()
    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(async () => {
    appController = app.get<AppController>(AppController)
  })

  describe('root', () => {
    it('should return "Hello World2!"', () => {
      expect(appController.getHello()).toEqual({ name: 'Hello World2!' })
    })
  })
})
