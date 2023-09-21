### 同步卡券信息

#### 1. 奖品列表

地址：
/AwardRelease/getAwardReleaseList

返回数据示例

```json
{
  "id": "3997985",
  "get_time": "2023-08-09 10:16:03",
  "effect_time": "2023-08-20 00:00:00"
}
```

#### 2. 获取奖品详情

地址：
/AwardRelease/getAwardReleaseDetail

返回数据示例

```json
{
  "award_info": {
    "award_name": "美团外卖红包10元*4",
    "introduction": "美团外卖通用红包"
  },
  "under_packet": [
    {
      "id": "3997984"
    },
    {
      "id": "3997983"
    },
    {
      "id": "3997982"
    },
    {
      "id": "3997981"
    }
  ]
}
```

#### 3. 奖品详情（兑换码）

地址：
/AwardRelease/getAwardReleaseDetail

返回数据示例

```json
{
  "log": [
    {
      "operation_time": "1692341635",
      "cards": {
        "expiretime": "2024-02-07",
        "cardpws": "w35frb4",
        "cardno": "MTWM1020230810Z8588"
      },
      "redemption_deadline": "2024-02-07"
    },
    {
      "msg": "您修改了领奖信息，奖品将于2023-08-20发放",
      "operation_time": "1691547380"
    }
  ]
}
```

### 当前数据

数据格式:

```json
{
  "pId": "3997985",
  "codeId": "3997984",
  "id": 17,
  "userNo": "admin",
  "code": "psEKf7R",
  "name": "10元券",
  "createdAt": "2023-08-28T14:46:40.000Z",
  "getAt": "2023-04-04T16:00:00.000Z",
  "startAt": "2023-04-09T16:00:00.000Z",
  "expiresAt": "2023-09-26T04:59:59.000Z",
  "used": false,
  "description": "['全场通用']",
  "value": "1000.00",
  "discount": "0.00",
  "minPurchaseAmount": "0.00",
  "maxDiscountAmount": "0.00"
}
```
