import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1773098242026 implements MigrationInterface {
    name = 'Init1773098242026'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" ADD "position" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "position"`);
    }

}
