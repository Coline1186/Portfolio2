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
Object.defineProperty(exports, "__esModule", { value: true });
const ContactInput_dto_1 = require("../dto/ContactInput.dto");
const mailer_utils_1 = require("../utils/mailer.utils");
const validate_entity_1 = require("../utils/validate-entity");
exports.default = {
    Mutation: {
        sendContact: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { input }) {
            const dto = Object.assign(new ContactInput_dto_1.ContactInputDTO(), input);
            yield (0, validate_entity_1.validateEntity)(dto);
            yield (0, mailer_utils_1.sendContactEmail)(dto);
            return true;
        }),
    },
};
