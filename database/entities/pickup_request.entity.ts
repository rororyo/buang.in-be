import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from './enums/status.enum';
import { PickupRequestsTrashType } from './pickup_request_trash_type.entity';
import { User } from './user.entity';

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
  
  @Column()
  user_id: string;
  @Column()
  trash_bank_id: string;

  //Define the relations
  @OneToMany(() => PickupRequestsTrashType, pickupRequestsTrashType => pickupRequestsTrashType.pickupRequest, { onDelete: 'CASCADE' })
  pickupRequestsTrashTypes: PickupRequestsTrashType[];
  
  @ManyToOne(() => User, user => user.pickupRequests, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })  // maps the FK explicitly
  user: User;
  
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'trash_bank_id' }) // maps the FK explicitly
  trashBank: User;
}
