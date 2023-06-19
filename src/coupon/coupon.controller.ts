import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { Coupon } from './coupon.entity'

@Controller('coupon')
export class CouponController {
  constructor(
    @InjectRepository(Coupon)
    private readonly couponRepository: Repository<Coupon>
  ) {}
  @Get('/getCouponList')
  getCoupons() {
    return {
      code: 0,
      data: ['1', '2', '3'],
      msg: 'success'
    }
  }
  @Post('/createCoupon')
  async createCoupon(@Body() couponDto: Coupon): Promise<Coupon> {
    // const coupon = plainToClass(Coupon, couponDto);
    // const errors = await validate(coupon);
    // if (errors.length > 0) {
    //   throw new HttpException(
    //     { message: '参数校验失败', errors: errors },
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }

    const newCoupon = await this.couponRepository.create(couponDto)
    return this.couponRepository.save(newCoupon)
  }
}
