import { firstValueFrom } from 'rxjs'
import { XHTTP } from '../xhttp'
import { AxiosResponse } from 'axios'
import { Injectable } from '@nestjs/common'

type Response<T> = AxiosResponse<{
  data: T
}>

@Injectable()
export class CodeAPI {
  constructor(private readonly http: XHTTP) {}
  /**
 * 1. 获取奖品列表
 * 返回示例 e.g
 ```
  return [
    {
      id: '3997985',
      get_time: '2023-08-09 10:16:03',
      effect_time: '2023-08-20 00:00:00'
    }
  ]
  ```
  */
  getPrizeList<T = any>(data: { page: number }): Promise<Response<T>> {
    return firstValueFrom(
      this.http.post<T>('/AwardRelease/getAwardReleaseList', {
        type: 0,
        page: data.page || 1
      })
    )
  }
  /**
 * 2. 获取奖品详情
 * 返回示例 e.g
 ```
  return {
  award_info: {
    award_name: '美团外卖红包10元*4',
    introduction: '美团外卖通用红包'
  },
  under_packet: [
    {
      id: '3997984'
    },
    {
      id: '3997983'
    },
    {
      id: '3997982'
    },
    {
      id: '3997981'
    }
  ]}
  ```
  * 3. 获取奖品兑换码
  * 返回示例 e.g
  ```
  return {
  log: [
      {
        operation_time: '1692341635',
        cards: {
          expiretime: '2024-02-07',
          cardpws: 'w35frb4',
          cardno: 'MTWM1020230810Z8588'
        },
        redemption_deadline: '2024-02-07'
      },
      {
        msg: '您修改了领奖信息，奖品将于2023-08-20发放',
        operation_time: '1691547380'
      }
    ]
  }
  ```
  */
  getPrizeDetailOrCode<T = any>(pId): Promise<AxiosResponse<{ data: T }>> {
    return firstValueFrom(
      this.http.post<T>('AwardRelease/getAwardReleaseDetail', {
        award_release_id: pId
      })
    )
  }
}
