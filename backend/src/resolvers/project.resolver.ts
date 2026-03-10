import datasource from "../datasource/datasource";
import { Project } from "../entities/Project.entity";
import { Skill } from "../entities/Skill.entity";
import { In, Not } from "typeorm";
import requireAdmin from "../utils/requireAdmin.utils";

type CreateProjectArgs = {
  input: {
    position: number;
    name: string;
    image?: string;
    githubLink?: string;
    webLink?: string;
    skillIds?: string[];
  };
};
type UpdateProjectArgs = {
  input: {
    id: string;
    name?: string;
    image?: string;
    githubLink?: string;
    webLink?: string;
    skillIds?: string[];
  };
};

const projectRepo = datasource.getRepository(Project);
const skillRepo = datasource.getRepository(Skill);

export default {
  Query: {
    projects: async () => {
      return await projectRepo.find({
        relations: ["skills"],
        order: { position: "ASC" },
      });
    },
    projectId: async (_: unknown, args: { id: string }) => {
      return await projectRepo.findOne({
        where: { id: args.id },
        relations: ["skills"],
      });
    },
  },
  Mutation: {
    createProject: requireAdmin(
      async (_: unknown, { input }: CreateProjectArgs) => {
        const position = input.position;
        const name = input.name?.trim();

        if (!name) {
          throw new Error("Le nom du projet est obligatoire");
        }

        const exists = await projectRepo.exists({ where: { name } });
        if (exists) {
          throw new Error("Un projet avec ce nom existe déjà");
        }

        const positionExist = await projectRepo.exists({ where: { position } });
        if (positionExist) {
          throw new Error("Un projet avec cette position existe déjà");
        }
        const uniqueSkillIds = [...new Set(input.skillIds)];
        const skills = await skillRepo.findBy({
          id: In(uniqueSkillIds),
        });

        if (skills.length !== uniqueSkillIds.length) {
          throw new Error("Une ou plusieurs skills sont introuvables");
        }

        const project = projectRepo.create({
          ...input,
          position,
          name,
          skills,
        });

        return projectRepo.save(project);
      },
    ),
    updateProject: requireAdmin(
      async (_: unknown, { input }: UpdateProjectArgs) => {
        const project = await projectRepo.findOne({
          where: { id: input.id },
          relations: ["skills"],
        });

        if (!project) {
          throw new Error("Projet non trouvé");
        }

        if (input.name !== undefined) {
          const name = input.name.trim();
          if (!name) {
            throw new Error("Le nom du projet ne peut pas être vide");
          }

          const exists = await projectRepo.exists({
            where: { name, id: Not(project.id) },
          });

          if (exists) {
            throw new Error("Un projet avec ce nom existe déjà");
          }

          project.name = name;
        }

        if (input.image !== undefined) {
          project.image = input.image;
        }

        if (input.githubLink !== undefined) {
          project.githubLink = input.githubLink;
        }

        if (input.webLink !== undefined) {
          project.webLink = input.webLink;
        }

        if (input.skillIds !== undefined) {
          const uniqueSkillIds = [...new Set(input.skillIds)];

          const skills = await skillRepo.findBy({
            id: In(uniqueSkillIds),
          });

          if (skills.length !== uniqueSkillIds.length) {
            throw new Error("Une ou plusieurs skills sont introuvables");
          }

          project.skills = skills;
        }

        return projectRepo.save(project);
      },
    ),
    reorderProjects: requireAdmin(async (_: unknown, { ids }: { ids: string[] }) => {
      for (let i = 0; i < ids.length; i++) {
        await projectRepo.update(ids[i], {
          position: i + 1,
        });
      }

      return true;
    }),
    deleteProject: requireAdmin(async (_: unknown, { id }: { id: string }) => {
      const project = await projectRepo.findOneBy({ id });

      if (!project) {
        throw new Error("Projet non trouvé");
      }

      await projectRepo.remove(project);

      return true;
    }),
  },
};
