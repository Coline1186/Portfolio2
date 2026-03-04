import { Repository } from "typeorm";
import { About } from "../entities/About.entity";
import datasource from "../datasource/datasource";

export default class AboutRepository extends Repository<About> {
    constructor() {
        super(About, datasource.createEntityManager())
    }
}