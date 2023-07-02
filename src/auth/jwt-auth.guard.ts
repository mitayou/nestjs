import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Observable } from 'rxjs'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    if (['/api/auth/login', '/api/auth/register'].includes(request.url)) {
      return true
    } else {
      return super.canActivate(context)
    }
  }

  // handleRequest(err, user, info) {
  //   console.log(err, user, info)
  //   return user
  // }
}
