"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const datasource_1 = __importDefault(require("../datasource/datasource"));
const Cv_entity_1 = require("../entities/Cv.entity");
const typeorm_1 = require("typeorm");
class CvRepository extends typeorm_1.Repository {
    constructor() {
        super(Cv_entity_1.Cv, datasource_1.default.createEntityManager());
    }
}
exports.default = CvRepository;
