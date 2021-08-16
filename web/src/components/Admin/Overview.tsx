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
    <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none bg-gray-300">
      <div className="px-4 mt-2 sm:px-6 lg:px-8">{children}</div>
    </main>
  );
};

export default Overview;
