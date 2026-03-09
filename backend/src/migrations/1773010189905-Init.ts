import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1773010189905 implements MigrationInterface {
    name = 'Init1773010189905'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "skill" ALTER COLUMN "position" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "skill" ALTER COLUMN "position" DROP NOT NULL`);
    }

}
