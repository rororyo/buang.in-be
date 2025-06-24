import { Column, Entity, JoinColumn, ManyToOne, OneToMany, Point, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from './enums/status.enum';
import { PickupRequestsTrashType } from './pickup_request_trash_type.entity';
import { User } from './user.entity';
import { TrashDetail } from './trash_detail.entity';
import { SubDistrict } from './sub_district.entity';

@Entity('pickup_requests')
export class PickupRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;  
  
  @Column()
  address: string;

  @Column()
  weight: number;

  @Column()
  length: number;

  @Column()
  width: number;

  @Column()
  height: number;

  @Column()
  img_url: string;

  @Column()
  status: Status; // 'pending' | 'accepted' | 'rejected' | 'completed'

  @Column()
  phone_number: string;

  @Column({
    type: 'geometry',
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  pickup_location: Point;

  @Column({
    type: 'timestamptz'
  })
  pickup_start_time: Date;

  @Column({
    type: 'timestamptz'
  })
  pickup_end_time: Date;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;
  
  @Column()
  sub_district_id: string;

  @Column()
  user_id: string;
  
  @Column()
  trash_bank_id: string;

  //Define the relations
  @OneToMany(() => PickupRequestsTrashType, pickupRequestsTrashType => pickupRequestsTrashType.pickupRequest, { onDelete: 'CASCADE' })
  pickupRequestsTrashTypes: PickupRequestsTrashType[];

  @OneToMany(() => TrashDetail, trashDetail => trashDetail.pickupRequest, { onDelete: 'CASCADE' })
  trashDetails: TrashDetail[];

  @ManyToOne(() => SubDistrict, subDistrict => subDistrict.pickupRequests, {
    onDelete: 'CASCADE' 
  })
  @JoinColumn({ name: 'sub_district_id' })
  subDistrict: SubDistrict;
  
  @ManyToOne(() => User, user => user.pickupRequests, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })  // maps the FK explicitly
  user: User;
  
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'trash_bank_id' }) // maps the FK explicitly
  trashBank: User;
}
