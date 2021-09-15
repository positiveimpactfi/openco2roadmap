import { ApolloProvider } from "@apollo/client";
import { useApollo } from "lib/apollo";
import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps);
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
