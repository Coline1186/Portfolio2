import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1770944707951 implements MigrationInterface {
    name = 'Init1770944707951'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "about" DROP CONSTRAINT "PK_e7b581a8a74d0a2ea3aa53226ee"`);
        await queryRunner.query(`ALTER TABLE "about" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "about" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "about" ADD CONSTRAINT "PK_e7b581a8a74d0a2ea3aa53226ee" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "project_skills" DROP CONSTRAINT "FK_d28a809ea4c3e5d71a5679a33b4"`);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57"`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "project" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "project_skills" DROP CONSTRAINT "FK_903cd0ac4cc4681039d306c485e"`);
        await queryRunner.query(`ALTER TABLE "skill" DROP CONSTRAINT "PK_a0d33334424e64fb78dc3ce7196"`);
        await queryRunner.query(`ALTER TABLE "skill" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "skill" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "skill" ADD CONSTRAINT "PK_a0d33334424e64fb78dc3ce7196" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "project_skills" DROP CONSTRAINT "PK_bca1832e4e611ff667ad2a31de1"`);
        await queryRunner.query(`ALTER TABLE "project_skills" ADD CONSTRAINT "PK_903cd0ac4cc4681039d306c485e" PRIMARY KEY ("skill_id")`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d28a809ea4c3e5d71a5679a33b"`);
        await queryRunner.query(`ALTER TABLE "project_skills" DROP COLUMN "project_id"`);
        await queryRunner.query(`ALTER TABLE "project_skills" ADD "project_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project_skills" DROP CONSTRAINT "PK_903cd0ac4cc4681039d306c485e"`);
        await queryRunner.query(`ALTER TABLE "project_skills" ADD CONSTRAINT "PK_bca1832e4e611ff667ad2a31de1" PRIMARY KEY ("skill_id", "project_id")`);
        await queryRunner.query(`ALTER TABLE "project_skills" DROP CONSTRAINT "PK_bca1832e4e611ff667ad2a31de1"`);
        await queryRunner.query(`ALTER TABLE "project_skills" ADD CONSTRAINT "PK_d28a809ea4c3e5d71a5679a33b4" PRIMARY KEY ("project_id")`);
        await queryRunner.query(`DROP INDEX "public"."IDX_903cd0ac4cc4681039d306c485"`);
        await queryRunner.query(`ALTER TABLE "project_skills" DROP COLUMN "skill_id"`);
        await queryRunner.query(`ALTER TABLE "project_skills" ADD "skill_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project_skills" DROP CONSTRAINT "PK_d28a809ea4c3e5d71a5679a33b4"`);
        await queryRunner.query(`ALTER TABLE "project_skills" ADD CONSTRAINT "PK_bca1832e4e611ff667ad2a31de1" PRIMARY KEY ("project_id", "skill_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_d28a809ea4c3e5d71a5679a33b" ON "project_skills" ("project_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_903cd0ac4cc4681039d306c485" ON "project_skills" ("skill_id") `);
        await queryRunner.query(`ALTER TABLE "project_skills" ADD CONSTRAINT "FK_d28a809ea4c3e5d71a5679a33b4" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "project_skills" ADD CONSTRAINT "FK_903cd0ac4cc4681039d306c485e" FOREIGN KEY ("skill_id") REFERENCES "skill"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_skills" DROP CONSTRAINT "FK_903cd0ac4cc4681039d306c485e"`);
        await queryRunner.query(`ALTER TABLE "project_skills" DROP CONSTRAINT "FK_d28a809ea4c3e5d71a5679a33b4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_903cd0ac4cc4681039d306c485"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d28a809ea4c3e5d71a5679a33b"`);
        await queryRunner.query(`ALTER TABLE "project_skills" DROP CONSTRAINT "PK_bca1832e4e611ff667ad2a31de1"`);
        await queryRunner.query(`ALTER TABLE "project_skills" ADD CONSTRAINT "PK_d28a809ea4c3e5d71a5679a33b4" PRIMARY KEY ("project_id")`);
        await queryRunner.query(`ALTER TABLE "project_skills" DROP COLUMN "skill_id"`);
        await queryRunner.query(`ALTER TABLE "project_skills" ADD "skill_id" uuid NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_903cd0ac4cc4681039d306c485" ON "project_skills" ("skill_id") `);
        await queryRunner.query(`ALTER TABLE "project_skills" DROP CONSTRAINT "PK_d28a809ea4c3e5d71a5679a33b4"`);
        await queryRunner.query(`ALTER TABLE "project_skills" ADD CONSTRAINT "PK_bca1832e4e611ff667ad2a31de1" PRIMARY KEY ("skill_id", "project_id")`);
        await queryRunner.query(`ALTER TABLE "project_skills" DROP CONSTRAINT "PK_bca1832e4e611ff667ad2a31de1"`);
        await queryRunner.query(`ALTER TABLE "project_skills" ADD CONSTRAINT "PK_903cd0ac4cc4681039d306c485e" PRIMARY KEY ("skill_id")`);
        await queryRunner.query(`ALTER TABLE "project_skills" DROP COLUMN "project_id"`);
        await queryRunner.query(`ALTER TABLE "project_skills" ADD "project_id" uuid NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_d28a809ea4c3e5d71a5679a33b" ON "project_skills" ("project_id") `);
        await queryRunner.query(`ALTER TABLE "project_skills" DROP CONSTRAINT "PK_903cd0ac4cc4681039d306c485e"`);
        await queryRunner.query(`ALTER TABLE "project_skills" ADD CONSTRAINT "PK_bca1832e4e611ff667ad2a31de1" PRIMARY KEY ("project_id", "skill_id")`);
        await queryRunner.query(`ALTER TABLE "skill" DROP CONSTRAINT "PK_a0d33334424e64fb78dc3ce7196"`);
        await queryRunner.query(`ALTER TABLE "skill" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "skill" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "skill" ADD CONSTRAINT "PK_a0d33334424e64fb78dc3ce7196" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "project_skills" ADD CONSTRAINT "FK_903cd0ac4cc4681039d306c485e" FOREIGN KEY ("skill_id") REFERENCES "skill"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57"`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "project" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "project_skills" ADD CONSTRAINT "FK_d28a809ea4c3e5d71a5679a33b4" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "about" DROP CONSTRAINT "PK_e7b581a8a74d0a2ea3aa53226ee"`);
        await queryRunner.query(`ALTER TABLE "about" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "about" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "about" ADD CONSTRAINT "PK_e7b581a8a74d0a2ea3aa53226ee" PRIMARY KEY ("id")`);
    }

}
