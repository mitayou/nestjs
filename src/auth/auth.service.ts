import { Injectable, Logger } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
// import jwt from 'jsonwebtoken'

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name)
  constructor(private jwtService: JwtService) {}
  login(userName: string, password: string) {
    this.logger.log('用户登录1', userName, password)

    return this.jwtService.sign({ userName })
  }
  checkLogin(userName: string, password: string) {
    this.logger.log('check 方法进入', userName, password)
  }
}
