import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1773097386029 implements MigrationInterface {
    name = 'Init1773097386029'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "about" ADD "position" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "about" DROP COLUMN "position"`);
    }

}
