import { Injectable, Logger } from '@nestjs/common'
import { Coupon } from '@/coupon/coupon.entity'
import { CouponRepository } from './../coupon/coupon.repository'
import { CodeAPI } from '../xhttp/api/code.api'

interface IPrizeList {
  /** 奖品ID */
  id: string | number
  /** 获得时间 */
  get_time: string
  /** 生效时间 */
  effect_time: string
}

interface IPrizeDetail {
  /** 奖品ID */
  award_info: {
    award_name: string
    introduction: string
  }
  under_packet: Array<{
    id: string
  }>
}

interface IPrizeCode {
  log: [
    {
      operation_time: string
      cards: {
        expiretime: string
        cardpws: string
        cardno: string
      }
      redemption_deadline: string
    },
    {
      msg: string
      operation_time: string
    }
  ]
}
@Injectable()
export class SyncCouponService {
  private readonly logger = new Logger(SyncCouponService.name)
  private arrMultipleDataLines: Array<Coupon> = []
  private mapDataLines: Map<string | number, Coupon> = new Map()
  constructor(private couponRepository: CouponRepository, private codeApi: CodeAPI) {}

  async run() {
    // 1. 获取奖品列表
    const res = await this.codeApi.getPrizeList<IPrizeList[]>({
      page: 1
    })

    const data = res.data.data
    this.logger.log(`奖品获取到的数量：${data.length}`)
    data.forEach(prizeList => {
      const objDataRecord = new Coupon()
      objDataRecord.pId = prizeList.id as string
      objDataRecord.getAt = new Date(prizeList.get_time)
      objDataRecord.startAt = new Date(prizeList.effect_time)
      this.mapDataLines.set(prizeList.id, objDataRecord)
    })

    // 2. 获取奖品详情
    const mapCodeId = new Map()
    for (const [key, value] of this.mapDataLines) {
      const {
        data: { data: detailData }
      } = await this.codeApi.getPrizeDetailOrCode<IPrizeDetail>(key)

      value.name = detailData.award_info.award_name.replace('*4', '')
      value.description = detailData.award_info.introduction
      // 转化为分
      value.value = Number(detailData.award_info.award_name.match(/(\d*)元/)[1] || 10) * 100
      value.discount = 0
      value.minPurchaseAmount = 0
      value.maxDiscountAmount = 0
      mapCodeId.set(
        key,
        detailData.under_packet.map(item => item.id)
      )
    }

    // 3. 获取奖品码
    for (const [key, value] of mapCodeId) {
      let i = 0
      for (const underId of value) {
        const {
          data: { data: codeData }
        } = await this.codeApi.getPrizeDetailOrCode<IPrizeCode>(underId)

        const currentObj = Object.assign({}, this.mapDataLines.get(key))
        currentObj.codeId = codeData.log[0].cards.cardno + '_' + ++i
        currentObj.userNo = ''
        currentObj.code = codeData.log[0].cards.cardpws
        currentObj.createdAt = new Date()
        currentObj.updateAt = new Date()
        currentObj.getAt = new Date(Number(codeData.log[1].operation_time) * 1000)
        currentObj.startAt = new Date(Number(codeData.log[0].operation_time) * 1000)
        currentObj.expiresAt = new Date(codeData.log[0].cards.expiretime + ' 23:59:59')
        currentObj.used = false
        currentObj.description = JSON.stringify(['全场通用', codeData.log[1].msg])
        this.arrMultipleDataLines.push(currentObj)
      }
    }
    // 插入数据库
    if (this.arrMultipleDataLines.length) {
      const insertRes = await this.couponRepository.upsertList(this.arrMultipleDataLines)
      this.logger.log(`新增的数量：${insertRes.raw?.affectedRows}`)
      return {
        data: insertRes.raw?.affectedRows || 0
      }
    } else {
      this.logger.log('没有需要插入的数据')
      return {
        data: 0
      }
    }
  }
}
