import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"; // Import Apollo Client
import "./index.css";
import App from "./App.tsx";
import { LanguageProvider } from "./context/LanguageContext.tsx";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ApolloProvider>
  </StrictMode>
);
