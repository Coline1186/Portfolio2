import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1771000578513 implements MigrationInterface {
    name = 'Init1771000578513'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "image"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" ADD "image" character varying NOT NULL`);
    }

}
