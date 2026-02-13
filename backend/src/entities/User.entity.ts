import * as argon2 from "argon2";
import { IsDefined, IsEmail, Matches, MinLength } from "class-validator";
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export enum UserRole {
  ADMIN = "ADMIN",
}

@Entity("users")
export class User {
  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  @IsEmail({}, { message: "Un email valide est requis" })
  email!: string;

  @Column()
  @IsDefined({ message: "Le mot de passe est requis" })
  @MinLength(8, {
    message: "Le mot de passe doit contenir au moins 8 caractères",
  })
  @Matches(/(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/, {
    message:
      "Le mot de passe doit contenir une majuscule, un chiffre et un caractère spécial",
  })
  password!: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.ADMIN })
  role!: UserRole;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
