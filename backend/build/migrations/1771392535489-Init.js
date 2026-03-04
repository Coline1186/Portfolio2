"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Init1771392535489 = void 0;
class Init1771392535489 {
    constructor() {
        this.name = 'Init1771392535489';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "project" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "githubLink" character varying, "webLink" character varying, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "skill" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "logo" character varying NOT NULL, CONSTRAINT "PK_a0d33334424e64fb78dc3ce7196" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "role" text NOT NULL DEFAULT 'ADMIN', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "about" ("id" SERIAL NOT NULL, "image" character varying NOT NULL, CONSTRAINT "PK_e7b581a8a74d0a2ea3aa53226ee" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "project_skills" ("project_id" integer NOT NULL, "skill_id" integer NOT NULL, CONSTRAINT "PK_bca1832e4e611ff667ad2a31de1" PRIMARY KEY ("project_id", "skill_id"))`);
            yield queryRunner.query(`CREATE INDEX "IDX_d28a809ea4c3e5d71a5679a33b" ON "project_skills" ("project_id") `);
            yield queryRunner.query(`CREATE INDEX "IDX_903cd0ac4cc4681039d306c485" ON "project_skills" ("skill_id") `);
            yield queryRunner.query(`ALTER TABLE "project_skills" ADD CONSTRAINT "FK_d28a809ea4c3e5d71a5679a33b4" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
            yield queryRunner.query(`ALTER TABLE "project_skills" ADD CONSTRAINT "FK_903cd0ac4cc4681039d306c485e" FOREIGN KEY ("skill_id") REFERENCES "skill"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "project_skills" DROP CONSTRAINT "FK_903cd0ac4cc4681039d306c485e"`);
            yield queryRunner.query(`ALTER TABLE "project_skills" DROP CONSTRAINT "FK_d28a809ea4c3e5d71a5679a33b4"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_903cd0ac4cc4681039d306c485"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_d28a809ea4c3e5d71a5679a33b"`);
            yield queryRunner.query(`DROP TABLE "project_skills"`);
            yield queryRunner.query(`DROP TABLE "about"`);
            yield queryRunner.query(`DROP TABLE "users"`);
            yield queryRunner.query(`DROP TABLE "skill"`);
            yield queryRunner.query(`DROP TABLE "project"`);
        });
    }
}
exports.Init1771392535489 = Init1771392535489;
