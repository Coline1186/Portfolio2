import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useApolloClient, useMutation } from "@apollo/client/react"
import { LOGOUT } from "@/requetes/mutations/auth.mutation"
import { useAuth } from "@/auth/useAuth"

interface LogoutResponse {
    logout: {
      success: boolean;
      message: string;
    };
  }


function Logout() {
   const navigate = useNavigate()
   const { reset } = useAuth()
   const client = useApolloClient()

   const [logout, { loading }] = useMutation<LogoutResponse>(LOGOUT, {
      fetchPolicy: "no-cache",
      onCompleted: async () => {
         await client.clearStore()
         reset()
         navigate("/")
      },
      onError: (err) => {
         console.error("Erreur lors de la déconnexion :", err)
         reset()
         navigate("/")
      },
   })

   useEffect(() => {
      logout()
   }, [logout])

   return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
         {loading ? "Veuillez patienter..." : "Vous êtes déconnecté."}
      </main>
   )
}

export default Logout
