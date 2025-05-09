import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TrashDetail } from "./trash_detail.entity";
import { TrashType } from "./trash_type.entity";

@Entity('trash_details_trash_types')
export class TrashDetailTrashType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  trash_detail_id: string;

  @Column()
  trash_type_id: string;

  @Column()
  photo_url: string;

  @Column()
  weight: number;

  //Define the relations
  @ManyToOne(() => TrashDetail, trashDetail => trashDetail.trashDetailsTrashTypes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'trash_detail_id' })
  trashDetail: TrashDetail;

  @ManyToOne(() => TrashType, trashType => trashType.trashDetailsTrashTypes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'trash_type_id' })
  trashType: TrashType;
}