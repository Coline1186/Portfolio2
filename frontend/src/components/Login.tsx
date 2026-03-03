import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { loginSchema } from "../validation/schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LOGIN } from "../requetes/mutations/auth.mutation";
import { useApolloClient, useMutation } from "@apollo/client/react";

type FormData = yup.InferType<typeof loginSchema>;

function Login() {
  const navigate = useNavigate();
  const { getInfos } = useAuth();
  const client = useApolloClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema),
  });
  interface LoginResponse {
    login: {
      success: boolean;
      message: string;
    };
  }

  interface LoginVariables {
    input: FormData;
  }

  const [login, { data, error }] = useMutation<LoginResponse, LoginVariables>(
    LOGIN,
    {
      fetchPolicy: "no-cache",
      async onCompleted(data: LoginResponse) {
        await client.clearStore();
        await getInfos();
        if (data.login.success) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      },
    },
  );

  const onSubmit = (data: FormData) => {
    login({ variables: { input: data } });
  };

  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm bg-white shadow-md rounded-lg p-4 sm:p-6 md:p-8 space-y-6"
      >
        <h1 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800">
          Connexion
        </h1>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            autoComplete="email"
            type="email"
            {...register("email")}
            placeholder="Indiquez votre email"
            className={`w-full p-3 text-base border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mot de passe
          </label>
          <input
            type="password"
            autoComplete="current-password"
            {...register("password")}
            placeholder="Indiquez votre mot de passe"
            className={`w-full p-3 text-base border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1" role="alert">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-amber-500 text-white py-3 px-4 rounded-md hover:bg-amber-600 transition-all duration-200"
        >
          Se connecter
        </button>
        <div className="text-sm text-center">
          {error?.message && (
            <span className="text-red-500 block">{error?.message}</span>
          )}
          {data?.login.message && (
            <span
              className={`block ${
                data.login.success ? "text-green-600" : "text-red-500"
              }`}
            >
              {data.login.message}
            </span>
          )}
        </div>
      </form>
    </main>
  );
}

export default Login;
