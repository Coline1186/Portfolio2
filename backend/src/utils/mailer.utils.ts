import { Resend } from "resend";
import { ContactInputDTO } from "../dto/ContactInput.dto";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(contact: ContactInputDTO) {
  try {
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: process.env.EMAIL_TO!,
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

    return true;
  } catch (error) {
    console.error("Erreur envoi email:", error);
    return false;
  }
}
