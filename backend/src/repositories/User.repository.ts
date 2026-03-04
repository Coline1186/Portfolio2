import { Repository } from "typeorm"
import datasource from "../datasource/datasource"
import { User } from "../entities/User.entity"

export default class UserRepository extends Repository<User> {
   constructor() {
      super(User, datasource.createEntityManager())
   }
}