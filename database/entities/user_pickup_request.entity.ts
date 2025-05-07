import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { PickupRequest } from "./pickup_request.entity";

@Entity('users_pickup_requests')
export class UserPickupRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'pickup_request_id' })
  pickupRequestId: string;

  @Column({ name: 'trash_bank_id' })
  trashBankId: string;
  
  //Define the relations
  @ManyToOne(() => User, user => user.userPickupRequests, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => PickupRequest, pickupRequest => pickupRequest.userPickupRequests, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pickup_request_id' })

  pickupRequest: PickupRequest;
  @ManyToOne(() => User, user => user.trashBankPickupRequests, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'trash_bank_id' })
  trashBank: User;
}