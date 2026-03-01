"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const About_entity_1 = require("../entities/About.entity");
const datasource_1 = __importDefault(require("../datasource/datasource"));
class AboutRepository extends typeorm_1.Repository {
    constructor() {
        super(About_entity_1.About, datasource_1.default.createEntityManager());
    }
}
exports.default = AboutRepository;
