import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PickupRequest } from "./pickup_request.entity";

@Entity('sub_districts')
export class SubDistrict {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  //Define the relation
    @OneToMany(() => PickupRequest, pickupRequest => pickupRequest.subDistrict, { onDelete: 'CASCADE' })
    pickupRequests: PickupRequest[]
}