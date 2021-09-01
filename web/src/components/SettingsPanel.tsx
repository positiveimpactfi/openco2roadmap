import { settingsLinks } from "data/settingsLinks";
import { useRouter } from "next/router";
import { Headings } from "./Admin/AdminPanel";
import TabMenu from "./TabMenu";

const SettingsPanel: React.FC<Headings> = ({
  title,
  description,
  children,
}) => {
  return (
    <main className="flex-1 h-full relative z-0 overflow-y-auto focus:outline-none bg-gray-100">
      <div className="px-4 sm:px-6 lg:px-8 py-4 ">
        <SettingsMenu />
      </div>
      <div className="px-4 mt-2 sm:px-6 lg:px-8 pb-10">
        <h1 className="text-2xl mb-4">{title}</h1>
        <p className="text-md mb-4">{description}</p>
        {children}
      </div>
    </main>
  );
};

const SettingsMenu: React.FC = () => {
  const router = useRouter();
  const currentTab = {
    name: "Etusivu",
    href: "/settings",
    current: router.pathname === "/settings",
  };
  const links = [currentTab, ...settingsLinks];

  return <TabMenu links={links} />;
};

export default SettingsPanel;
