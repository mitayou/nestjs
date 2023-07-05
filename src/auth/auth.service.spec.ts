import { Test } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'
import { JwtConfigService } from './jwt-config.services'
import { AppModule } from '@/app.module'
import { INestApplication } from '@nestjs/common'

describe('AuthService', () => {
  let app: INestApplication
  let service: AuthService
  let signedToken: string

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [
        AppModule,
        JwtModule.registerAsync({
          useClass: JwtConfigService
        })
      ]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
    service = moduleFixture.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should return a signed token after login', () => {
    const userName = 'testUser'
    const password = 'testPassword'
    signedToken = service.login(userName, password)

    expect(signedToken).toBeDefined()
    // Add more assertions if needed
  })

  it('should log the input values when calling checkLogin', () => {
    const userName = 'testUser'
    const password = 'testPassword'
    const loggerSpy = jest.spyOn(service['logger'], 'log')

    service.checkLogin(userName, password)

    expect(loggerSpy).toHaveBeenCalledWith('check 方法进入', userName, password)
  })
})
