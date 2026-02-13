import { Not } from "typeorm";
import datasource from "../datasource/datasource";
import { Skill } from "../entities/Skill.entity";

const skillRepo = datasource.getRepository(Skill);

export default {
    Query: {
        skills: async () => {
            return await skillRepo.find();
        },
        skillId: async (_: any, args: { id: string }) => {
            return await skillRepo.findOneBy({ id: args.id });
        }
    },
    Mutation: {
        createSkill: async (_: any, { input }: any) => {
            const name = input.name?.trim();
            if (!name) {
                throw new Error("Le nom de la compétence est obligatoire");
            }

            const exists = await skillRepo.exists({ where: { name } });
            if (exists) {
                throw new Error("Une compétence avec ce nom existe déjà");
            }

            const skill = skillRepo.create({
                ...input,
                name,
            });

            return skillRepo.save(skill);
        },
        updateSkill: async (_: any, { input }: any) => {
            const skill = await skillRepo.findOneBy({ id: input.id });

            if (!skill) {
                throw new Error("Compétence non trouvée");
            }

            if (input.name !== undefined) {
                const name = input.name.trim();
                if (!name) {
                    throw new Error("Le nom de la compétence ne peut pas être vide");
                }

                const exists = await skillRepo.exists({
                    where: { name, id: Not(skill.id) },
                });

                if (exists) {
                    throw new Error("Une compétence avec ce nom existe déjà");
                }

                skill.name = name;
            }

            if (input.logo !== undefined) {
                skill.logo = input.logo;
            }

            return skillRepo.save(skill);
        },
        deleteSkill: async (_: any, { id }: any) => {
            const skill = await skillRepo.findOneBy({ id });

            if (!skill) {
                throw new Error("Compétence non trouvée");
            }

            await skillRepo.remove(skill);

            return true;
        },
    },
};