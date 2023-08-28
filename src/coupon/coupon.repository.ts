import { InsertResult, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Coupon } from './coupon.entity'

@Injectable()
export class CouponRepository {
  constructor(
    @InjectRepository(Coupon)
    private readonly couponRepository: Repository<Coupon>
  ) {}

  async findByUserId(userNo): Promise<Coupon[]> {
    return await this.couponRepository.find({ where: { userNo } })
  }
  async addByUserId(userNo: string, couponInfo: Coupon): Promise<InsertResult> {
    return await this.couponRepository.insert({
      ...couponInfo,
      id: undefined,
      userNo,
      description: JSON.stringify(couponInfo.description || {})
    })
  }
}
