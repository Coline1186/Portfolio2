"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const load_files_1 = require("@graphql-tools/load-files");
const merge_1 = require("@graphql-tools/merge");
const graphql_scalars_1 = require("graphql-scalars");
const isProd = process.env.NODE_ENV === "production";
const resolversArray = (0, load_files_1.loadFilesSync)(path_1.default.join(__dirname), {
    extensions: isProd ? [".resolver.js"] : [".resolver.ts"],
    recursive: true,
});
resolversArray.push(graphql_scalars_1.resolvers);
exports.default = (0, merge_1.mergeResolvers)(resolversArray);
