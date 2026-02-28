import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1772146668236 implements MigrationInterface {
    name = 'Init1772146668236'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "image" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "image" DROP NOT NULL`);
    }

}
