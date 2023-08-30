import { Module } from '@nestjs/common'
import { SyncCouponService } from './sync-coupon.service'
import { SyncCouponController } from './sync-coupon.controller'

@Module({
  controllers: [SyncCouponController],
  providers: [SyncCouponService]
})
export class SyncCouponModule {}
