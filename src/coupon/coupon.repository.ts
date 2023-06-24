import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Coupon } from './coupon.entity'

@Injectable()
export class CouponRepository {
  constructor(
    @InjectRepository(Coupon)
    private readonly couponRepository: Repository<Coupon>
  ) {}

  async findByCode(code: string): Promise<Coupon> {
    return await this.couponRepository.findOne({ where: { code: code } })
  }
}
