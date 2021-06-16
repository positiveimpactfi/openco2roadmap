import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Container from "components/Container";
import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URI as string,
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
