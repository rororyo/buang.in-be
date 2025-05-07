import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from './enums/status.enum';
import { PickupRequestsTrashType } from './pickup_request_trash_type.entity';
import { UserPickupRequest } from './user_pickup_request.entity';

@Entity('pickup_requests')
export class PickupRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  total_weight: number;

  @Column()
  img_url: string;

  @Column()
  status: Status; // 'pending' | 'accepted' | 'rejected' | 'completed'

  @Column()
  phone_number: string;

  @Column()
  pickup_location: string;

  @Column()
  pickup_time: Date;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  //Define the relations
  @OneToMany(() => PickupRequestsTrashType, pickupRequestsTrashType => pickupRequestsTrashType.pickupRequest, { onDelete: 'CASCADE' })
  pickupRequestsTrashTypes: PickupRequestsTrashType[];
  
  @OneToMany(()=> UserPickupRequest, userPickupRequest => userPickupRequest.pickupRequest, { onDelete: 'CASCADE' })
  userPickupRequests: UserPickupRequest[];
}
