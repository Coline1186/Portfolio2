import { Repository } from "typeorm";
import { Project } from "../entities/Project.entity";
import datasource from "../datasource/datasource";

export default class ProjectRepository extends Repository<Project> {
    constructor() {
        super(Project, datasource.createEntityManager())
    }
}