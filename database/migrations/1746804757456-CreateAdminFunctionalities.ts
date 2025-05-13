import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAdminFunctionalities1746804757456 implements MigrationInterface {
    name = 'CreateAdminFunctionalities1746804757456'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "trash_details" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "pickup_request_id" uuid NOT NULL, "points" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_0727dd73d442101ccbd5246654d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "trash_details_trash_types" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "trash_detail_id" uuid NOT NULL, "trash_type_id" uuid NOT NULL, "photo_url" character varying NOT NULL, "weight" integer NOT NULL, CONSTRAINT "PK_d5dc39c0be7f4bc1d7b57495088" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "trash_details" ADD CONSTRAINT "FK_9348ab1a5e9fd0f769fed8d83c5" FOREIGN KEY ("pickup_request_id") REFERENCES "pickup_requests"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trash_details_trash_types" ADD CONSTRAINT "FK_cca048076d28ef8be0375bfd86f" FOREIGN KEY ("trash_detail_id") REFERENCES "trash_details"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trash_details_trash_types" ADD CONSTRAINT "FK_30a97781fcd7af59126d577b3fe" FOREIGN KEY ("trash_type_id") REFERENCES "trash_types"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trash_details_trash_types" DROP CONSTRAINT "FK_30a97781fcd7af59126d577b3fe"`);
        await queryRunner.query(`ALTER TABLE "trash_details_trash_types" DROP CONSTRAINT "FK_cca048076d28ef8be0375bfd86f"`);
        await queryRunner.query(`ALTER TABLE "trash_details" DROP CONSTRAINT "FK_9348ab1a5e9fd0f769fed8d83c5"`);
        await queryRunner.query(`DROP TABLE "trash_details_trash_types"`);
        await queryRunner.query(`DROP TABLE "trash_details"`);
    }

}
