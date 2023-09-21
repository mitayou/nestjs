import { Controller, Post } from '@nestjs/common'
import { SyncCouponService } from './sync-coupon.service'

@Controller('sync-coupon')
export class SyncCouponController {
  constructor(private readonly syncCouponService: SyncCouponService) {}

  @Post('/run')
  async run() {
    return this.syncCouponService.run()
  }
}
