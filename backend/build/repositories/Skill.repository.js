"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const datasource_1 = __importDefault(require("../datasource/datasource"));
const Skill_entity_1 = require("../entities/Skill.entity");
class SkillRepository extends typeorm_1.Repository {
    constructor() {
        super(Skill_entity_1.Skill, datasource_1.default.createEntityManager());
    }
}
exports.default = SkillRepository;
