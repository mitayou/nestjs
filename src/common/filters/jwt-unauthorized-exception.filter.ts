import { Catch, ExceptionFilter, ArgumentsHost, UnauthorizedException } from '@nestjs/common'

@Catch(UnauthorizedException)
export class JwtUnauthorizedExceptionFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()

    response.status(401).json({
      message: '无权限',
      status: 401
    })
  }
}
