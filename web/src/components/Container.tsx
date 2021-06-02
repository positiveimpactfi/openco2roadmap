import Head from "next/head";
import Navbar from "components/Navbar";

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

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://positiveimpact.fi"
          target="_blank"
          rel="noopener noreferrer"
        >
          Positive Impact Finland
        </a>
      </footer>
    </div>
  );
};

export default Container;
