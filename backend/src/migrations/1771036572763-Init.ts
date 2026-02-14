import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1771036572763 implements MigrationInterface {
    name = 'Init1771036572763'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "project" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "githubLink" character varying, "webLink" character varying, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "skill" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "logo" character varying NOT NULL, CONSTRAINT "PK_a0d33334424e64fb78dc3ce7196" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "about" ("id" SERIAL NOT NULL, "image" character varying NOT NULL, CONSTRAINT "PK_e7b581a8a74d0a2ea3aa53226ee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "role" text NOT NULL DEFAULT 'ADMIN', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project_skills" ("project_id" integer NOT NULL, "skill_id" integer NOT NULL, CONSTRAINT "PK_bca1832e4e611ff667ad2a31de1" PRIMARY KEY ("project_id", "skill_id"))`);
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
        await queryRunner.query(`DROP TABLE "project_skills"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "about"`);
        await queryRunner.query(`DROP TABLE "skill"`);
        await queryRunner.query(`DROP TABLE "project"`);
    }

}
