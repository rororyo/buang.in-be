import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { TrashType } from "./trash_type.entity";
import { PickupRequest } from "./pickup_request.entity"; // You need to have this defined.

@Entity('pickup_requests_trash_types')
export class PickupRequestsTrashType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'pickup_request_id' })
  pickupRequestId: string;

  @Column({ name: 'trash_type_id' })
  trashTypeId: string;
  
  //Define the relations

  @ManyToOne(() => PickupRequest, pickupRequest => pickupRequest.pickupRequestsTrashTypes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pickup_request_id' })
  pickupRequest: PickupRequest;

  @ManyToOne(() => TrashType, trashType => trashType.pickupRequestsTrashTypes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'trash_type_id' })
  trashType: TrashType;
}
