import * as yup from "yup"

export const loginSchema = yup.object({
    email: yup.string().email("Email invalide").required("L'email est requis"),
    password: yup.string().required("Le mot de passe est requis"),
})

export const contactSchema = yup.object({
    firstName: yup.string().required("Le prénom est requis"),
    lastName: yup.string().required("Le nom est requis"),
    email: yup.string().email("Email invalide").required("L'email est requis"),
    message: yup.string().required("Le message est requis"),
})