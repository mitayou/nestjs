import { Body, Controller, HttpException, HttpStatus, Logger, Post, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from './jwt-auth.guard'

@Controller('api/auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name)
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { userName: string; password: string }): Promise<{ status: number; data: string }> {
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
  @Post('checkLogin')
  @UseGuards(JwtAuthGuard)
  async checkLogin(@Body() loginDto: { userName: string; password: string }): Promise<{ status: number; data: any }> {
    const { userName, password } = loginDto
    try {
      return {
        status: 200,
        data: await this.authService.checkLogin(userName, password)
      }
    } catch (error) {
      this.logger.log(`logai code: ${userName}, error: ${error}`)
      throw new HttpException(error, HttpStatus.FORBIDDEN)
    }
  }
}
