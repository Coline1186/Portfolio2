import datasource from "../datasource/datasource";
import { Cv } from "../entities/Cv.entity";
import { Repository } from "typeorm";

export default class CvRepository extends Repository<Cv> {
    constructor() {
        super(Cv, datasource.createEntityManager())
    }
}