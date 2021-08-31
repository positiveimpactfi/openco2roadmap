import ClientOnly from "components/ClientsOnly";
import Head from "next/head";
import React, { useState } from "react";
import { Header } from "./Header";
import { DesktopSidebar, MobileSideBar } from "./Sidebar";

interface ContainerProps {}

const Container: React.FC<ContainerProps> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <>
      <Head>
        <title>Open CO2 Roadmap</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen overflow-hidden bg-gray-100">
        <DesktopSidebar />
        <MobileSideBar
          sidebarOpen={mobileMenuOpen}
          setSidebarOpen={setMobileMenuOpen}
        />
        <ContentArea setMobileMenuOpen={setMobileMenuOpen}>
          <ClientOnly>{children}</ClientOnly>
        </ContentArea>
      </div>
    </>
  );
};

export const ContentArea = ({ setMobileMenuOpen, children }) => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header setMobileMenuOpen={setMobileMenuOpen} />
      <div className="flex-1 flex items-stretch overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          {/* Primary column */}
          <section
            aria-labelledby="primary-heading"
            className="min-w-0 flex-1 h-full flex flex-col overflow-hidden lg:order-last"
          >
            <h1 id="primary-heading" className="sr-only">
              Open CO2 Roadmap
            </h1>
            {/* Your content */}
            {children}
          </section>
        </main>
      </div>
    </div>
  );
};

export default Container;
