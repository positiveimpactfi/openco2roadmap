import Menu from "./Menu";
import { AdminSidebarProps } from "../Common/Sidebar";
import TopBar from "../Common/TopBar";

export type Headings = {
  title?: string;
  description?: string;
};

export type OverviewProps = Pick<AdminSidebarProps, "setSidebarOpen">;

const Overview: React.FC<OverviewProps & Headings> = ({
  setSidebarOpen,
  title,
  description,
  children,
}) => {
  return (
    <div className="flex flex-col w-full flex-1 overflow-hidden">
      <TopBar setSidebarOpen={setSidebarOpen} />
      <MainContent title={title} description={description}>
        {children}
      </MainContent>
    </div>
  );
};

const MainContent: React.FC<Headings> = ({ title, description, children }) => {
  return (
    <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none bg-gray-100">
      <div className="px-4 sm:px-6 lg:px-8 py-4 ">
        <Menu />
      </div>
      <div className="px-4 mt-2 sm:px-6 lg:px-8">
        <h1 className="text-2xl mb-4">{title} </h1>
        <p className="text-md mb-4">{description}</p>
        {children}
      </div>
    </main>
  );
};

export default Overview;
