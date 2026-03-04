import { IsEmail, IsNotEmpty } from "class-validator";

export class ContactInputDTO {
    @IsNotEmpty({ message: "Le prénom est requis" })
    firstName!: string;

    @IsNotEmpty({ message: "Le nom est requis" })
    lastName!: string;

    @IsEmail({}, { message: "Un email valide est requis" })
    email!: string;

    @IsNotEmpty({ message: "Le message est requis" })
    message!: string;
}