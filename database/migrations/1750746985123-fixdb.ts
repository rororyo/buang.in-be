import { MigrationInterface, QueryRunner } from "typeorm";

export class Fixdb1750746985123 implements MigrationInterface {
    name = 'Fixdb1750746985123'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sub_districts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_43c23ac384b89ea8d0a9fe9fd39" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pickup_requests" DROP COLUMN "pickup_time"`);
        await queryRunner.query(`ALTER TABLE "pickup_requests" ADD "weight" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pickup_requests" ADD "length" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pickup_requests" ADD "width" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pickup_requests" ADD "height" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pickup_requests" ADD "pickup_start_time" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pickup_requests" ADD "pickup_end_time" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pickup_requests" ADD "sub_district_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pickup_requests" ADD CONSTRAINT "FK_11c7b6cc3a47906fc1b48e580eb" FOREIGN KEY ("sub_district_id") REFERENCES "sub_districts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pickup_requests" DROP CONSTRAINT "FK_11c7b6cc3a47906fc1b48e580eb"`);
        await queryRunner.query(`ALTER TABLE "pickup_requests" DROP COLUMN "sub_district_id"`);
        await queryRunner.query(`ALTER TABLE "pickup_requests" DROP COLUMN "pickup_end_time"`);
        await queryRunner.query(`ALTER TABLE "pickup_requests" DROP COLUMN "pickup_start_time"`);
        await queryRunner.query(`ALTER TABLE "pickup_requests" DROP COLUMN "height"`);
        await queryRunner.query(`ALTER TABLE "pickup_requests" DROP COLUMN "width"`);
        await queryRunner.query(`ALTER TABLE "pickup_requests" DROP COLUMN "length"`);
        await queryRunner.query(`ALTER TABLE "pickup_requests" DROP COLUMN "weight"`);
        await queryRunner.query(`ALTER TABLE "pickup_requests" ADD "pickup_time" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`DROP TABLE "sub_districts"`);
    }

}
