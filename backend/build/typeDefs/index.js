"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const merge_1 = require("@graphql-tools/merge");
const graphql_scalars_1 = require("graphql-scalars");
const contact_1 = __importDefault(require("./contact"));
const about_1 = __importDefault(require("./about"));
const cv_1 = __importDefault(require("./cv"));
const project_1 = __importDefault(require("./project"));
const skill_1 = __importDefault(require("./skill"));
const user_1 = __importDefault(require("./user"));
exports.default = (0, merge_1.mergeTypeDefs)([
    about_1.default,
    contact_1.default,
    cv_1.default,
    project_1.default,
    skill_1.default,
    user_1.default,
    graphql_scalars_1.typeDefs,
]);
