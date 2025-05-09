import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PickupRequest } from "./pickup_request.entity";
import { TrashDetailTrashType } from "./trash_detail_trash_type.entity";

@Entity('trash_details')
export class TrashDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  pickup_request_id: string;

  @Column()
  points : number;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  // Define the relations
  @OneToMany(() => TrashDetailTrashType, trashDetailTrashType => trashDetailTrashType.trashDetail, { onDelete: 'CASCADE' })
  trashDetailsTrashTypes: TrashDetailTrashType[];

  @ManyToOne(() => PickupRequest, pickupRequest => pickupRequest.trashDetails, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pickup_request_id' }) // explicitly define FK column
  pickupRequest: PickupRequest;
  

}