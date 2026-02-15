import nodemailer from "nodemailer";
import { ContactInputDTO } from "../dto/ContactInput.dto";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendContactEmail(contact: ContactInputDTO) {
  await transporter.sendMail({
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
}
