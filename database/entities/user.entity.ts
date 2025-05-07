import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Roles } from './enums/roles.enum';
import { UserPickupRequest } from './user_pickup_request.entity';

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

  @Column({nullable: true})
  location: string;

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
  @OneToMany(() => UserPickupRequest, userPickupRequest => userPickupRequest.userId, { onDelete: 'CASCADE' })
  userPickupRequests: UserPickupRequest[];

  @OneToMany(() => UserPickupRequest, userPickupRequest => userPickupRequest.trashBankId, { onDelete: 'CASCADE' })
  trashBankPickupRequests: UserPickupRequest[];
}