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
exports.transporter = void 0;
exports.sendContactEmail = sendContactEmail;
const nodemailer_1 = __importDefault(require("nodemailer"));
exports.transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
function sendContactEmail(contact) {
    return __awaiter(this, void 0, void 0, function* () {
        yield exports.transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            replyTo: contact.email,
            subject: `Nouveau message de ${contact.firstName} ${contact.lastName}`,
            html: `
      <h2>Nouveau message via le formulaire</h2>

      <p><strong>Prénom :</strong> ${contact.firstName}</p>
      <p><strong>Nom :</strong> ${contact.lastName}</p>
      <p><strong>Email :</strong> ${contact.email}</p>

      <hr/>

      <p><strong>Message :</strong></p>
      <p>${contact.message.replace(/\n/g, "<br>")}</p>
    `,
        });
    });
}
