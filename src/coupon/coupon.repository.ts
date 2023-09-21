import { In, InsertResult, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Coupon } from './coupon.entity'

const EXCLUDE_COLUMN: Array<keyof Coupon> = ['createdAt', 'used']

@Injectable()
export class CouponRepository {
  constructor(
    @InjectRepository(Coupon)
    private readonly couponRepository: Repository<Coupon>
  ) {}

  insert(arrCoupon: Array<Coupon>) {
    return this.couponRepository.insert(arrCoupon)
  }

  /**
   * 批量更新数据，如果存在，则替换部分字段，不存在则插入
   * @param arrCoupon 要插入的数据
   * @returns 插入结果
   */
  async upsertList(arrCoupon: Array<Coupon>) {
    // 1. 获取所有codeId
    const arrCodeIds = arrCoupon.map(item => item.codeId)
    // 2. 查询是否存在
    const resConpon = await this.couponRepository.find({ select: ['codeId', ...EXCLUDE_COLUMN], where: { codeId: In(arrCodeIds) } })
    // 3. 如果存在数据,则更新
    if (resConpon.length > 0) {
      arrCoupon.forEach((item, index) => {
        // 找到对应的存在的数据
        const existDataLine = resConpon.find(res => res.codeId === item.codeId)
        // 如果存在,则更新部分字段到要插入的数据
        if (existDataLine) {
          const overrideObj = {}
          EXCLUDE_COLUMN.forEach(key => (overrideObj[key] = existDataLine[key] === void 0 ? item[key] : existDataLine[key]))
          arrCoupon[index] = { ...item, ...overrideObj }
        }
      })
    }
    return this.couponRepository.upsert(arrCoupon, ['codeId'])
  }

  /**
   * 根据用户ID查询
   * @param {{ userNo: string, current: number, size: number }} obj 查询体
   * @param obj.userNo 用户ID
   * @param [obj.current] 当前页
   * @param [obj.size] 每页条数
   * @returns {Promise<Coupon[]>} 查询结果
   */
  async findByUserId({ userNo, current, size }: { userNo: string | number; current: number; size: number }): Promise<Coupon[]> {
    return this.couponRepository
      .createQueryBuilder('coupon')
      .where('userNo = :userNo ', { userNo })
      .skip((current - 1) * size)
      .take(size)
      .getMany()
  }
  /**
   * 插入单条数据
   * @param userNo 用户id
   * @param couponInfo 要插入的对象
   * @returns 插入结果
   */
  async addByUserId(userNo: string, couponInfo: Coupon): Promise<InsertResult> {
    return await this.couponRepository.insert({
      ...couponInfo,
      id: undefined,
      userNo,
      description: JSON.stringify(couponInfo.description || {})
    })
  }
}
