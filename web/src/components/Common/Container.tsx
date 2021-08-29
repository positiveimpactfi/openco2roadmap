import Head from "next/head";
import React, { useState } from "react";
import Sidebar from "./Sidebar";

interface ContainerProps {}

const Container: React.FC<ContainerProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex flex-row min-h-screen w-screen">
      <Head>
        <title>Open CO2 Roadmap</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <Sidebar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
        <main className="flex flex-col w-full justify-center items-center">
          {children}
        </main>
      </>
    </div>
  );
};

export default Container;
