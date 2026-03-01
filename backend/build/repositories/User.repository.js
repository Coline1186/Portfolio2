"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const datasource_1 = __importDefault(require("../datasource/datasource"));
const User_entity_1 = require("../entities/User.entity");
class UserRepository extends typeorm_1.Repository {
    constructor() {
        super(User_entity_1.User, datasource_1.default.createEntityManager());
    }
}
exports.default = UserRepository;
