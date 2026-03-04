import datasource from "../datasource/datasource";
import { User } from "../entities/User.entity";

const userRepo = datasource.getRepository(User);

export async function findUserByEmail(email: string) {
  return userRepo.findOneBy({ email });
}
