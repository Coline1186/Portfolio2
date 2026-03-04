import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1772059966208 implements MigrationInterface {
    name = 'Init1772059966208'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cv" ("id" SERIAL NOT NULL, "cv" character varying NOT NULL, CONSTRAINT "PK_4ddf7891daf83c3506efa503bb8" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "cv"`);
    }

}
