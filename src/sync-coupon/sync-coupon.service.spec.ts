import { Test, TestingModule } from '@nestjs/testing'
import { SyncCouponService } from './sync-coupon.service'

describe('SyncCouponService', () => {
  let service: SyncCouponService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SyncCouponService]
    }).compile()

    service = module.get<SyncCouponService>(SyncCouponService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
