import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import App from "./App";
import "./index.css";
import "./App.css";
import { AuthProvider } from "./auth/AuthProvider";
import { Toaster } from "sonner";
import { ToastContainer } from "react-toastify"

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_API_URL,
  credentials: "include",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <App />
        <Toaster position="top-right" />
        <ToastContainer position="top-right" autoClose={2000} />
      </AuthProvider>
    </ApolloProvider>
  </StrictMode>,
);
