import * as yup from "yup";
import { Fade } from "react-awesome-reveal";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { contactSchema } from "@/validation/schema";
import { useForm } from "react-hook-form";
import { useApolloClient, useMutation } from "@apollo/client/react";
import { SEND_CONTACT } from "@/requetes/mutations/contact.mutation";
import logoBack from "@/assets/logoBack.webp";
import { Button } from "@/ui/button";

type FormData = yup.InferType<typeof contactSchema>;

function Contact() {
  const client = useApolloClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(contactSchema),
  });

  interface ContactResponse {
    sendContact: boolean;
  }

  interface ContactVariables {
    input: FormData;
  }

  const [sendContact, { loading }] = useMutation<
    ContactResponse,
    ContactVariables
  >(SEND_CONTACT, {
    fetchPolicy: "no-cache",

    async onCompleted(data) {
      await client.clearStore();

      if (data.sendContact) {
        toast.success("Message envoyé");
        reset();
      } else {
        toast.error("Une erreur est survenue, veuillez réessayer.");
      }
    },

    onError() {
      toast.error("Une erreur est survenue, veuillez réessayer.");
    },
  });

  const onSubmit = (data: FormData) => {
    sendContact({ variables: { input: data } });
  };
  return (
    <div className="border-t-6 border-[#ffc58d] pb-[2.9rem] min-h-screen lg:min-h-[88vh]">
      <Fade duration={2000}>
        <div className="text-center">
          <h1 className="text-4xl font-bold mt-[1vh]">Contact</h1>
          <br />
          <p>
            N'hésitez pas à me contacter, je vous répondrai dans les plus brefs
            délais
          </p>
        </div>
        <div className="relative w-[92%] mx-auto mt-6 mb-10 pt-4 flex justify-center overflow-hidden rounded-[8%] border border-[#ffc58d] shadow-[0px_5px_15px_rgb(241,190,143)] tablet:w-[75%] tablet:mt-8 tablet:mb-12 lg:w-151 lg:mt-10 lg:mb-16">
          <div
            className="absolute inset-0 bg-center bg-cover opacity-60"
            style={{ backgroundImage: `url(${logoBack})` }}
          />
          <div className="relative z-10 w-full flex justify-center px-4 tablet:px-6 lg:px-11">
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="w-full space-y-5"
            >
              <div className="flex flex-col">
                <label htmlFor="firstName" className="font-semibold">
                  Prénom<span> *</span>
                </label>
                <input
                  id="firstName"
                  type="text"
                  {...register("firstName")}
                  className={`w-full mt-2 px-3 py-2 text-base border bg-white/90 ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 lg:text-lg`}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="lastName" className="font-semibold">
                  Nom<span> *</span>
                </label>
                <input
                  id="lastName"
                  type="text"
                  {...register("lastName")}
                  className={`w-full mt-2 px-3 py-2 text-base border bg-white/90 ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 lg:text-lg`}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="email" className="font-semibold">
                  Email<span> *</span>
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...register("email")}
                  className={`w-full mt-2 px-3 py-2 text-base border bg-white/90 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 lg:text-lg`}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="message" className="font-semibold">
                  Message<span> *</span>
                </label>
                <textarea
                  id="message"
                  rows={4}
                  {...register("message")}
                  className={`w-full mt-2 px-3 py-2 text-base border bg-white/90 ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 lg:text-lg`}
                />
              </div>

              <div className="flex justify-center pt-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full tablet:w-1/2 lg:w-1/3"
                >
                  {loading ? "Envoi..." : "Envoyer"}
                </Button>
              </div>

              <p className="text-sm text-gray-600 text-center">
                <span>*</span> Champs obligatoires
              </p>
            </form>
          </div>
        </div>
      </Fade>
    </div>
  );
}

export default Contact;
