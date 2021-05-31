import Head from "next/head";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Open CO2 Roadmap</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div>Hello world</div>
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

export default Home;
