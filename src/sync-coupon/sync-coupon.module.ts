import { Module } from '@nestjs/common'
import { SyncCouponService } from './sync-coupon.service'
import { SyncCouponController } from './sync-coupon.controller'
import { CouponModule } from '@/coupon/coupon.module'
import { XHttpModule } from '@/xhttp/xhttp.module'

@Module({
  imports: [CouponModule, XHttpModule],
  controllers: [SyncCouponController],
  providers: [SyncCouponService]
})
export class SyncCouponModule {}
