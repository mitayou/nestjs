import { Module } from '@nestjs/common'
import { CouponController } from './coupon.controller'
import { CouponRepository } from './coupon.repository'
import { Coupon } from './coupon.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([Coupon, CouponRepository])],
  controllers: [CouponController],
  // 添加CouponRepository到providers数组中
  providers: [CouponRepository],
  exports: []
})
export class CouponModule {}
