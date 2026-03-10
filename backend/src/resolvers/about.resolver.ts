import datasource from "../datasource/datasource";
import { About } from "../entities/About.entity";
import requireAdmin from "../utils/requireAdmin.utils";

const aboutRepo = datasource.getRepository(About);

export default {
  Query: {
    abouts: async () => {
      return await aboutRepo.find({ order: { position: "ASC" } });
    },
    aboutId: async (_: unknown, args: { id: string }) => {
      return await aboutRepo.findOneBy({ id: args.id });
    },
  },
  Mutation: {
    createAbout: requireAdmin(
      async (
        _: unknown,
        { input }: { input: { position?: number; image: string } },
      ) => {
        const position = input.position;
        const positionExist = await aboutRepo.exists({ where: { position } });
        if (positionExist) {
          throw new Error("Une photo avec cette position existe déjà");
        }
        const newAbout = aboutRepo.create({
          position,
          image: input.image,
        });

        return aboutRepo.save(newAbout);
      },
    ),
    updateAbout: requireAdmin(
      async (
        _: unknown,
        { input }: { input: { id: string; image?: string } },
      ) => {
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
    reorderAbouts: async (_: unknown, { ids }: { ids: string[] }) => {
      for (let i = 0; i < ids.length; i++) {
        await aboutRepo.update(ids[i], {
          position: i + 1,
        });
      }

      return true;
    },
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
