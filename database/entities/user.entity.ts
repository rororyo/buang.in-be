import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Point } from 'typeorm';
import { Roles } from './enums/roles.enum';
import { PickupRequest } from './pickup_request.entity';
import { PointExchangeRequest } from './point_exchange_request.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid') 
  id: string;

  @Column() 
  username: string;

  @Column({ unique: true }) 
  email: string;

  @Column()
  password: string;

  @Column({default:'user'})
  role: Roles;

  @Column({nullable: true})
  avatar_url: string;

  @Column({nullable: true})
  gender: string;

  @Column({nullable: true})
  birthday: Date;

  @Column({nullable: true})
  phone_number: string;

  @Column({
    type: 'geometry',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  location: Point;

  @Column({nullable: true})
  address: string;

  @Column({default: 0})
  points: number;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
  // Define the relations
  @OneToMany(() => PickupRequest, pickupRequest => pickupRequest.user, { onDelete: 'CASCADE' })
  pickupRequests: PickupRequest[];
  
  @OneToMany(() => PickupRequest, pickupRequest => pickupRequest.trashBank, { onDelete: 'CASCADE' })
  receivedPickupRequests: PickupRequest[];
  
  @OneToMany(()=>PointExchangeRequest, pointExchangeRequest => pointExchangeRequest.user, {onDelete: 'CASCADE'})
  pointExchangeRequests: PointExchangeRequest[]
}