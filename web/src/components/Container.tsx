import Head from "next/head";
import Navbar from "components/Navbar";
import Footer from "components/Footer";

interface ContainerProps {}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
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
  );
};

export default Container;
