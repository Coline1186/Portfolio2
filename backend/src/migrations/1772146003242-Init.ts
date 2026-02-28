import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1772146003242 implements MigrationInterface {
    name = 'Init1772146003242'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" ADD "image" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "image"`);
    }

}
