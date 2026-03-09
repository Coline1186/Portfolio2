import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1773010132048 implements MigrationInterface {
    name = 'Init1773010132048'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "skill" ADD "position" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "skill" DROP COLUMN "position"`);
    }

}
