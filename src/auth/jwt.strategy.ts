import { Injectable, Logger } from '@nestjs/common'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name)
  constructor(private configServer: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configServer.get('secret'),
      debug: true
    })
  }

  /**
   * 仅当验证通过后，才会进入该方法，如果token鉴权失败不会进入
   * @param payload token信息
   * @returns
   */
  async validate(payload: any) {
    // this.logger.log('validate 函数进入', payload)
    return payload
  }
}
