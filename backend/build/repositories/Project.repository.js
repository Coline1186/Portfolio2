"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Project_entity_1 = require("../entities/Project.entity");
const datasource_1 = __importDefault(require("../datasource/datasource"));
class ProjectRepository extends typeorm_1.Repository {
    constructor() {
        super(Project_entity_1.Project, datasource_1.default.createEntityManager());
    }
}
exports.default = ProjectRepository;
