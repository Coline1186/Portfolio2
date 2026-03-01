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
const typeorm_1 = require("typeorm");
const datasource_1 = __importDefault(require("../datasource/datasource"));
const Skill_entity_1 = require("../entities/Skill.entity");
const skillRepo = datasource_1.default.getRepository(Skill_entity_1.Skill);
exports.default = {
    Query: {
        skills: () => __awaiter(void 0, void 0, void 0, function* () {
            return yield skillRepo.find();
        }),
        skillId: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            return yield skillRepo.findOneBy({ id: args.id });
        })
    },
    Mutation: {
        createSkill: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { input }) {
            var _b;
            const name = (_b = input.name) === null || _b === void 0 ? void 0 : _b.trim();
            if (!name) {
                throw new Error("Le nom de la compétence est obligatoire");
            }
            const exists = yield skillRepo.exists({ where: { name } });
            if (exists) {
                throw new Error("Une compétence avec ce nom existe déjà");
            }
            const skill = skillRepo.create(Object.assign(Object.assign({}, input), { name }));
            return skillRepo.save(skill);
        }),
        updateSkill: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { input }) {
            const skill = yield skillRepo.findOneBy({ id: input.id });
            if (!skill) {
                throw new Error("Compétence non trouvée");
            }
            if (input.name !== undefined) {
                const name = input.name.trim();
                if (!name) {
                    throw new Error("Le nom de la compétence ne peut pas être vide");
                }
                const exists = yield skillRepo.exists({
                    where: { name, id: (0, typeorm_1.Not)(skill.id) },
                });
                if (exists) {
                    throw new Error("Une compétence avec ce nom existe déjà");
                }
                skill.name = name;
            }
            if (input.logo !== undefined) {
                skill.logo = input.logo;
            }
            return skillRepo.save(skill);
        }),
        deleteSkill: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) {
            const skill = yield skillRepo.findOneBy({ id });
            if (!skill) {
                throw new Error("Compétence non trouvée");
            }
            yield skillRepo.delete(skill);
            return true;
        }),
    },
};
