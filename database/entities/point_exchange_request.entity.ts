import { Column, Entity, JoinColumn, ManyToOne, OneToMany, Point, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from './enums/status.enum';
import { PickupRequestsTrashType } from './pickup_request_trash_type.entity';
import { User } from './user.entity';
import { TrashDetail } from './trash_detail.entity';
import { SubDistrict } from './sub_district.entity';

@Entity('point_exchange_requests')
export class PointExchangeRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  total_points:number

  @Column()
  transfer_method:string

  @Column()
  account_number:string

  @Column({nullable: true})
  bank_name:string
  
  @Column({default: 'pending'})
  status:Status

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column()
  user_id: string

  @ManyToOne(() => User, user => user.pointExchangeRequests, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User
}