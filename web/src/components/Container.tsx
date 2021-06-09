import Head from "next/head";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import { useMeQuery } from "generated/graphql";
import { UserContext } from "context/UserContext";

interface ContainerProps {}

const Container: React.FC<ContainerProps> = ({ children }) => {
  const { data } = useMeQuery();

  const user = data?.me;
  return (
    <UserContext.Provider value={{ user }}>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Head>
          <title>Open CO2 Roadmap</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          {children}
        </main>
        <Footer />
      </div>
    </UserContext.Provider>
  );
};

export default Container;
