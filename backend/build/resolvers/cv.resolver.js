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
const Cv_entity_1 = require("../entities/Cv.entity");
const requireAdmin_utils_1 = __importDefault(require("../utils/requireAdmin.utils"));
const cvRepo = datasource_1.default.getRepository(Cv_entity_1.Cv);
const getSingletonCv = () => __awaiter(void 0, void 0, void 0, function* () {
    const allCvs = yield cvRepo.find({ order: { id: "ASC" } });
    if (allCvs.length === 0) {
        return null;
    }
    const [firstCv, ...duplicates] = allCvs;
    if (duplicates.length > 0) {
        yield cvRepo.remove(duplicates);
    }
    return firstCv;
});
exports.default = {
    Query: {
        cv: () => __awaiter(void 0, void 0, void 0, function* () {
            return yield getSingletonCv();
        }),
        cvs: () => __awaiter(void 0, void 0, void 0, function* () {
            const singletonCv = yield getSingletonCv();
            return singletonCv ? [singletonCv] : [];
        }),
        cvId: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            return yield cvRepo.findOneBy({ id: args.id });
        }),
    },
    Mutation: {
        createCv: (0, requireAdmin_utils_1.default)((_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { input }) {
            const existingCv = yield getSingletonCv();
            if (existingCv) {
                existingCv.cv = input.cv;
                return cvRepo.save(existingCv);
            }
            const newCv = cvRepo.create({ cv: input.cv });
            return cvRepo.save(newCv);
        })),
        updateCv: (0, requireAdmin_utils_1.default)((_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { input }) {
            const cv = yield cvRepo.findOneBy({ id: input.id });
            if (!cv) {
                throw new Error("CV non trouvé");
            }
            if (input.cv !== undefined) {
                cv.cv = input.cv;
            }
            return cvRepo.save(cv);
        })),
        deleteCv: (0, requireAdmin_utils_1.default)((_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) {
            const cv = yield cvRepo.findOneBy({ id });
            if (!cv) {
                throw new Error("CV non trouvé");
            }
            yield cvRepo.remove(cv);
            return true;
        })),
    },
};
