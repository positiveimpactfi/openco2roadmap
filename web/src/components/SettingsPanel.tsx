import { settingsLinks } from "data/links/settingsLinks";
import { useRouter } from "next/router";
import { Headings } from "types/Headings";
import PageWithTabs from "./Layout/PageWithTabs";

const SettingsPanel: React.FC<Headings> = ({
  title,
  description,
  children,
}) => {
  const router = useRouter();
  const currentTab = {
    name: "Etusivu",
    description: "Asetukset - etusivu",
    href: "/settings",
    current: router.pathname === "/settings",
  };
  const links = [currentTab, ...settingsLinks];
  return (
    <PageWithTabs title={title} description={description} links={links}>
      {children}
    </PageWithTabs>
  );
};

export default SettingsPanel;
