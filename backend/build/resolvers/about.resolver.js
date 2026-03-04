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
const About_entity_1 = require("../entities/About.entity");
const requireAdmin_utils_1 = __importDefault(require("../utils/requireAdmin.utils"));
const aboutRepo = datasource_1.default.getRepository(About_entity_1.About);
exports.default = {
    Query: {
        abouts: () => __awaiter(void 0, void 0, void 0, function* () {
            return yield aboutRepo.find();
        }),
        aboutId: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            return yield aboutRepo.findOneBy({ id: args.id });
        }),
    },
    Mutation: {
        createAbout: (0, requireAdmin_utils_1.default)((_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { input }) {
            const newAbout = aboutRepo.create({
                image: input.image,
            });
            return aboutRepo.save(newAbout);
        })),
        updateAbout: (0, requireAdmin_utils_1.default)((_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { input }) {
            const about = yield aboutRepo.findOneBy({ id: input.id });
            if (!about) {
                throw new Error("Image non trouvée");
            }
            if (input.image !== undefined) {
                about.image = input.image;
            }
            return aboutRepo.save(about);
        })),
        deleteAbout: (0, requireAdmin_utils_1.default)((_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) {
            const about = yield aboutRepo.findOneBy({ id });
            if (!about) {
                throw new Error("About non trouvé");
            }
            yield aboutRepo.remove(about);
            return true;
        })),
    },
};
