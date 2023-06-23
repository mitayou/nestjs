import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { IsNotEmpty, IsString, Length } from 'class-validator'

@Entity('coupon')
export class Coupon {
  /** 自增主键 */
  @PrimaryGeneratedColumn()
  id: number

  /** 券码 */
  @Column({ length: 20, unique: true, comment: '卡券券码' })
  @IsNotEmpty()
  @IsString()
  code: string

  /** 名称 */
  @Column({ length: 50, comment: '卡券名称' })
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  name: string

  /** 创建时间 */
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '卡券创建时间'
  })
  @IsNotEmpty()
  createdAt: Date

  /** 到期时间 */
  @Column({ type: 'timestamp', comment: '卡券到期时间' })
  expiresAt: Date

  /** 使用状态(1未使用，0已使用) */
  @Column({ type: 'boolean', default: false, comment: '卡券使用状态' })
  used: boolean

  /** 卡券描述 */
  @Column({ length: 100, comment: '卡券描述' })
  description: string

  /** 卡券面值 */
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    comment: '卡券面值'
  })
  value: number

  /** 折扣率 */
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    comment: '卡券折扣率'
  })
  discount: number

  /** 最低消费金额 */
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    comment: '卡券最低消费金额'
  })
  minPurchaseAmount: number

  /** 最高折扣金额 */
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    comment: '卡券最高折扣金额'
  })
  maxDiscountAmount: number
}
