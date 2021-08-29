import { DesktopTopBar } from "./DesktopTopBar";
import { MobileTopBar } from "./MobileTopBar";
import { OverviewProps } from "../Admin/Overview";

const TopBar: React.FC<OverviewProps> = ({ setSidebarOpen }) => {
  return (
    <>
      <MobileTopBar setSidebarOpen={setSidebarOpen} />
      <DesktopTopBar />
    </>
  );
};

export default TopBar;
