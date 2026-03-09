import datasource from "../datasource/datasource";
import { About } from "../entities/About.entity";
import requireAdmin from "../utils/requireAdmin.utils";

const aboutRepo = datasource.getRepository(About);

export default {
  Query: {
    abouts: async () => {
      return await aboutRepo.find();
    },
    aboutId: async (_: unknown, args: { id: string }) => {
      return await aboutRepo.findOneBy({ id: args.id });
    },
  },
  Mutation: {
    createAbout: requireAdmin(
      async (_: unknown, { input }: { input: { image: string } }) => {
        const newAbout = aboutRepo.create({
          image: input.image,
        });

        return aboutRepo.save(newAbout);
      },
    ),
    updateAbout: requireAdmin(
      async (_: unknown, { input }: { input: { id: string; image?: string } }) => {
        const about = await aboutRepo.findOneBy({ id: input.id });

        if (!about) {
          throw new Error("Image non trouvée");
        }

        if (input.image !== undefined) {
          about.image = input.image;
        }

        return aboutRepo.save(about);
      },
    ),
    deleteAbout: requireAdmin(async (_: unknown, { id }: { id: string }) => {
      const about = await aboutRepo.findOneBy({ id });

      if (!about) {
        throw new Error("About non trouvé");
      }

      await aboutRepo.remove(about);

      return true;
    }),
  },
};
