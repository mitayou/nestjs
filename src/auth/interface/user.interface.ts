import { ApiProperty } from '@nestjs/swagger'

export class User {
  @ApiProperty({ description: '用户编码' })
  userCode: string

  @ApiProperty({ description: '用户名' })
  name: string
}

export class UserLogin extends User {
  @ApiProperty({ description: '令牌' })
  token: string
}
