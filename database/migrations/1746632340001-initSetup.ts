import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSetup1746632340001 implements MigrationInterface {
    name = 'InitSetup1746632340001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'user', "avatar_url" character varying, "gender" character varying, "birthday" TIMESTAMP, "phone_number" character varying, "location" character varying, "address" character varying, "points" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "trash_types" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, CONSTRAINT "PK_4f540b1792accc6cfe45d9cb63a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pickup_requests_trash_types" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "pickup_request_id" uuid NOT NULL, "trash_type_id" uuid NOT NULL, CONSTRAINT "PK_48355e785407ace153294c2627f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pickup_requests" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "address" character varying NOT NULL, "total_weight" integer NOT NULL, "img_url" character varying NOT NULL, "status" character varying NOT NULL, "phone_number" character varying NOT NULL, "pickup_location" character varying NOT NULL, "pickup_time" TIMESTAMP NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_4a347837d7b9ff0c32e41951a6a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_pickup_requests" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "pickup_request_id" uuid NOT NULL, "trash_bank_id" uuid NOT NULL, CONSTRAINT "PK_18eed1155e4c4bce2a51b489372" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pickup_requests_trash_types" ADD CONSTRAINT "FK_fa1d589f2a6cff6fc4c768869b6" FOREIGN KEY ("pickup_request_id") REFERENCES "pickup_requests"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pickup_requests_trash_types" ADD CONSTRAINT "FK_ff257f7b2d3bcaea081a3abb4cc" FOREIGN KEY ("trash_type_id") REFERENCES "trash_types"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_pickup_requests" ADD CONSTRAINT "FK_5418f08f01dc85f0a1a39429713" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_pickup_requests" ADD CONSTRAINT "FK_1c45e003491b7358886b6ae6dfa" FOREIGN KEY ("pickup_request_id") REFERENCES "pickup_requests"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_pickup_requests" ADD CONSTRAINT "FK_48811ff09e38c81eca8e1b3518b" FOREIGN KEY ("trash_bank_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_pickup_requests" DROP CONSTRAINT "FK_48811ff09e38c81eca8e1b3518b"`);
        await queryRunner.query(`ALTER TABLE "users_pickup_requests" DROP CONSTRAINT "FK_1c45e003491b7358886b6ae6dfa"`);
        await queryRunner.query(`ALTER TABLE "users_pickup_requests" DROP CONSTRAINT "FK_5418f08f01dc85f0a1a39429713"`);
        await queryRunner.query(`ALTER TABLE "pickup_requests_trash_types" DROP CONSTRAINT "FK_ff257f7b2d3bcaea081a3abb4cc"`);
        await queryRunner.query(`ALTER TABLE "pickup_requests_trash_types" DROP CONSTRAINT "FK_fa1d589f2a6cff6fc4c768869b6"`);
        await queryRunner.query(`DROP TABLE "users_pickup_requests"`);
        await queryRunner.query(`DROP TABLE "pickup_requests"`);
        await queryRunner.query(`DROP TABLE "pickup_requests_trash_types"`);
        await queryRunner.query(`DROP TABLE "trash_types"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
