import { Body, Controller, HttpException, HttpStatus, Logger, Post } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('api/auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name)
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { userName: string; password: string }): Promise<{ status: number; data: boolean }> {
    const { userName, password } = loginDto
    try {
      return {
        status: 200,
        data: await this.authService.login(userName, password)
      }
    } catch (error) {
      this.logger.log(`logai code: ${userName}, error: ${error}`)
      throw new HttpException(error, HttpStatus.FORBIDDEN)
    }
  }
}
