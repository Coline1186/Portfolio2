import { ContactInputDTO } from "../dto/ContactInput.dto";
import { sendContactEmail } from "../utils/mailer.utils";
import { validateEntity } from "../utils/validate-entity";

export default {
  Mutation: {
    sendContact: async (_: any, { input }: any) => {
      const dto = Object.assign(new ContactInputDTO(), input);

      await validateEntity(dto);

      await sendContactEmail(dto);

      return true;
    },
  },
};
