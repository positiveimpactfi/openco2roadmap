import { ApolloProvider } from "@apollo/client";
import { createApolloClient } from "lib/apollo";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import "tailwindcss/tailwind.css";

const client = createApolloClient();

function MyApp({ Component, pageProps }: AppProps) {
  // we only want to fetch notifications on full page load
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        process.env.NEXT_PUBLIC_API_URI.split("/").slice(0, 3).join("/") +
          "/notifications",
        { method: "GET" }
      );
      const res = await data.json();
      localStorage.setItem("announcements", JSON.stringify(res));
      return res;
    };
    fetchData();
  }, []);
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
