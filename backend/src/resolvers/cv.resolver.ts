import datasource from "../datasource/datasource";
import { Cv } from "../entities/Cv.entity";
import requireAdmin from "../utils/requireAdmin.utils";

const cvRepo = datasource.getRepository(Cv);

const getSingletonCv = async () => {
    const allCvs = await cvRepo.find({ order: { id: "ASC" } });

    if (allCvs.length === 0) {
        return null;
    }

    const [firstCv, ...duplicates] = allCvs;

    if (duplicates.length > 0) {
        await cvRepo.remove(duplicates);
    }

    return firstCv;
};

export default {
    Query: {
        cv: async () => {
            return await getSingletonCv();
        },
        cvs: async () => {
            const singletonCv = await getSingletonCv();

            return singletonCv ? [singletonCv] : [];
        },
        cvId: async (_: unknown, args: { id: string }) => {
            return await cvRepo.findOneBy({ id: args.id });
        },
    },
    Mutation: {
        createCv: requireAdmin(async (_: unknown, { input }: { input: { cv: string } }) => {
            const existingCv = await getSingletonCv();

            if (existingCv) {
                existingCv.cv = input.cv;
                return cvRepo.save(existingCv);
            }

            const newCv = cvRepo.create({ cv: input.cv });
            return cvRepo.save(newCv);
        }),
        updateCv: requireAdmin(async (_: unknown, { input }: { input: { id: string; cv?: string } }) => {
            const cv = await cvRepo.findOneBy({ id: input.id });

            if (!cv) {
                throw new Error("CV non trouvé");
            }

            if (input.cv !== undefined) {
                cv.cv = input.cv;
            }

            return cvRepo.save(cv);
        }),
        deleteCv: requireAdmin(async (_: unknown, { id }: { id: string }) => {
            const cv = await cvRepo.findOneBy({ id });

            if (!cv) {
                throw new Error("CV non trouvé");
            }

            await cvRepo.remove(cv);

            return true;
        }),
    },
}
