import { Controller, Get, Post } from '@nestjs/common'

@Controller('coupon')
export class CouponController {
  @Get('/getCouponList')
  getCoupons() {
    return {
      code: 0,
      data: ['1', '2', '3'],
      msg: 'success'
    }
  }
  @Post('/insertCoupon')
  insertCoupons() {
    return {
      code: 0,
      data: true,
      msg: 'success'
    }
  }
}
