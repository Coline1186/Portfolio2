import { User, UserRole } from "../entities/User.entity";
import datasource from "../datasource/datasource";
import { validateEntity } from "../utils/validate-entity";
import { MyContext } from "..";
import * as argon2 from "argon2";
import Cookies from "cookies";
import { generateToken } from "../utils/auth.utils";

const userRepo = datasource.getRepository(User);
const isProduction = process.env.NODE_ENV === "production";

const authCookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? ("none" as const) : ("lax" as const),
  path: "/",
  maxAge: 2 * 60 * 60 * 1000, // 2h
};

export default {
  Query: {
    userInfo: async (_p: any, args: { id: string }) => {
      return await userRepo.findOneBy({ id: args.id });
  }
},
  Mutation: {
    register: async (_p: any, { input }: any) => {
      const newUser = userRepo.create({
        ...input,
        role: UserRole.ADMIN,
      });
      
      await validateEntity(newUser);
      
      return userRepo.save(newUser);
    },
    login: async (_p: any, args: any, ctx: MyContext) => {
        const user = await userRepo.findOneBy({ email: args.input.email });
        if (!user) {
            throw new Error("Email ou mot de passe incorrect");
        }

        const validPassword = await argon2.verify(user.password, args.input.password);
        if (!validPassword) {
            throw new Error("Email ou mot de passe incorrect");
        }

        const token = await generateToken(user.email);
        let cookies = new Cookies(ctx.req, ctx.res);
        cookies.set("token", token, authCookieOptions);
        return { message: "Bienvenue", success: true };
    },
    logout: async (_p: any, _args: any, ctx: MyContext) => {
        let cookies = new Cookies(ctx.req, ctx.res);
        cookies.set("token", "", {
          ...authCookieOptions,
          maxAge: 0,
        });
        return { message: "Déconnexion réussie", success: true };
    },
    checkToken: async (_p: any, _args: any, ctx: MyContext) => {
      if (!ctx.user) return null;
      return ctx.user ? { email: ctx.user.email, role: ctx.user.role } : null;
    },
  },
};
