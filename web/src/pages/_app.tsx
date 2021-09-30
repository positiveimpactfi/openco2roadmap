import { ApolloProvider } from "@apollo/client";
import { createApolloClient } from "lib/apollo";
import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";

const client = createApolloClient();
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
