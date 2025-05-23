import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { PickupRequestsTrashType } from "./pickup_request_trash_type.entity";
import { TrashDetailTrashType } from "./trash_detail_trash_type.entity";

@Entity('trash_types')
export class TrashType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @OneToMany(() => PickupRequestsTrashType, prtt => prtt.trashType)
  pickupRequestsTrashTypes: PickupRequestsTrashType[];

  @OneToMany(() => TrashDetailTrashType, trashDetailTrashType => trashDetailTrashType.trashType)
  trashDetailsTrashTypes: TrashDetailTrashType[];
}
