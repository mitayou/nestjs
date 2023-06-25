import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name)
  login(userName: string, password: string) {
    this.logger.log('用户登录1', userName, password)
    return true
  }
}
