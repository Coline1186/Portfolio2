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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const datasource_1 = __importDefault(require("../datasource/datasource"));
const Project_entity_1 = require("../entities/Project.entity");
const Skill_entity_1 = require("../entities/Skill.entity");
const typeorm_1 = require("typeorm");
const requireAdmin_utils_1 = __importDefault(require("../utils/requireAdmin.utils"));
const projectRepo = datasource_1.default.getRepository(Project_entity_1.Project);
const skillRepo = datasource_1.default.getRepository(Skill_entity_1.Skill);
exports.default = {
    Query: {
        projects: () => __awaiter(void 0, void 0, void 0, function* () {
            return yield projectRepo.find({ relations: ["skills"] });
        }),
        projectId: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            return yield projectRepo.findOne({
                where: { id: args.id },
                relations: ["skills"],
            });
        }),
    },
    Mutation: {
        createProject: (0, requireAdmin_utils_1.default)((_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { input }) {
            var _b;
            const name = (_b = input.name) === null || _b === void 0 ? void 0 : _b.trim();
            if (!name) {
                throw new Error("Le nom du projet est obligatoire");
            }
            const exists = yield projectRepo.exists({ where: { name } });
            if (exists) {
                throw new Error("Un projet avec ce nom existe déjà");
            }
            const uniqueSkillIds = [...new Set(input.skillIds)];
            const skills = yield skillRepo.findBy({
                id: (0, typeorm_1.In)(uniqueSkillIds),
            });
            if (skills.length !== uniqueSkillIds.length) {
                throw new Error("Une ou plusieurs skills sont introuvables");
            }
            const project = projectRepo.create(Object.assign(Object.assign({}, input), { name,
                skills }));
            return projectRepo.save(project);
        })),
        updateProject: (0, requireAdmin_utils_1.default)((_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { input }) {
            const project = yield projectRepo.findOne({
                where: { id: input.id },
                relations: ["skills"],
            });
            if (!project) {
                throw new Error("Projet non trouvé");
            }
            if (input.name !== undefined) {
                const name = input.name.trim();
                if (!name) {
                    throw new Error("Le nom du projet ne peut pas être vide");
                }
                const exists = yield projectRepo.exist({
                    where: { name, id: (0, typeorm_1.Not)(project.id) },
                });
                if (exists) {
                    throw new Error("Un projet avec ce nom existe déjà");
                }
                project.name = name;
            }
            if (input.image !== undefined) {
                project.image = input.image;
            }
            if (input.githubLink !== undefined) {
                project.githubLink = input.githubLink;
            }
            if (input.webLink !== undefined) {
                project.webLink = input.webLink;
            }
            if (input.skillIds !== undefined) {
                const uniqueSkillIds = [...new Set(input.skillIds)];
                const skills = yield skillRepo.findBy({
                    id: (0, typeorm_1.In)(uniqueSkillIds),
                });
                if (skills.length !== uniqueSkillIds.length) {
                    throw new Error("Une ou plusieurs skills sont introuvables");
                }
                project.skills = skills;
            }
            return projectRepo.save(project);
        })),
        deleteProject: (0, requireAdmin_utils_1.default)((_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) {
            const project = yield projectRepo.findOneBy({ id });
            if (!project) {
                throw new Error("Projet non trouvé");
            }
            yield projectRepo.remove(project);
            return true;
        })),
    },
};
