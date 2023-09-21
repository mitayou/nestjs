import { Body, Controller, HttpException, HttpStatus, Post, Req, UseFilters, UseGuards } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { Coupon } from './coupon.entity'
import { CouponRepository } from './coupon.repository'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { JwtUnauthorizedExceptionFilter } from '@/common/filters/jwt-unauthorized-exception.filter'

@Controller('api/coupon')
@UseFilters(JwtUnauthorizedExceptionFilter)
export class CouponController {
  constructor(private couponRepository: CouponRepository) {}
  @Post('/getCouponList')
  @UseGuards(JwtAuthGuard)
  async getCoupons(@Req() request, @Body('current') current = 1, @Body('size') size = 10) {
    const userId = request.user.userId
    const res = await this.couponRepository.findByUserId({ userNo: userId, current, size })

    return {
      code: 0,
      data: res,
      msg: 'success'
    }
  }
  @Post('/createCoupon')
  @UseGuards(JwtAuthGuard)
  async createCoupon(@Req() request, @Body() couponDto: Coupon): Promise<any> {
    const coupon = plainToClass(Coupon, couponDto)
    const errors = await validate(coupon)
    if (errors.length > 0) {
      throw new HttpException({ message: '参数校验失败', errors: errors }, HttpStatus.BAD_REQUEST)
    }
    const userId = request.user.userId
    const res = await this.couponRepository.addByUserId(userId, couponDto)
    return {
      code: 0,
      data: res.raw?.affectedRows || 0,
      msg: 'success'
    }
  }
}
