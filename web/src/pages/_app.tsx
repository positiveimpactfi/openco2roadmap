import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Container from "components/Container";
import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Container>
        <Component {...pageProps} />
      </Container>
    </ApolloProvider>
  );
}

export default MyApp;
