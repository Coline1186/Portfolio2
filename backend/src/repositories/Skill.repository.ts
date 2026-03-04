import { Repository } from "typeorm";
import datasource from "../datasource/datasource";
import { Skill } from "../entities/Skill.entity";

export default class SkillRepository extends Repository<Skill> {
  constructor() {
    super(Skill, datasource.createEntityManager());
  }
}
