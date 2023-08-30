import { Test, TestingModule } from '@nestjs/testing'
import { SyncCouponController } from './sync-coupon.controller'
import { SyncCouponService } from './sync-coupon.service'

describe('SyncCouponController', () => {
  let controller: SyncCouponController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SyncCouponController],
      providers: [SyncCouponService]
    }).compile()

    controller = module.get<SyncCouponController>(SyncCouponController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
