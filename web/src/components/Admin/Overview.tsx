import Menu from "./Menu";
import { AdminSidebarProps } from "./Sidebar";
import TopBar from "./TopBar";

export type OverviewProps = Pick<AdminSidebarProps, "setSidebarOpen">;

const Overview: React.FC<OverviewProps> = ({ setSidebarOpen, children }) => {
  return (
    <div className="flex flex-col w-full flex-1 overflow-hidden">
      <TopBar setSidebarOpen={setSidebarOpen} />
      <MainContent>{children}</MainContent>
    </div>
  );
};

const MainContent: React.FC = ({ children }) => {
  return (
    <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none bg-gray-100">
      <div className="px-4 sm:px-6 lg:px-8 py-4 ">
        <Menu />
      </div>
      <div className="px-4 mt-2 sm:px-6 lg:px-8">
        <h1 className="text-2xl mb-4">Hallintapaneeli MVP </h1>
        <p className="text-md mb-4">
          Näillä sivuilla voit muokata CO2-laskurin asetuksia.
        </p>
        {children}
      </div>
    </main>
  );
};

export default Overview;
