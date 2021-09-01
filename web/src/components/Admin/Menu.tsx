import TabMenu from "components/TabMenu";
import { adminLinks, PageLink } from "data/adminLinks";
import { useRouter } from "next/router";

const Menu = () => {
  const router = useRouter();
  const currentTab: Partial<PageLink & { current: boolean }> = {
    name: "Hallintapaneeli",
    href: "/admin",
    current: router.pathname === "/admin",
  };
  const tabs = [currentTab, ...adminLinks];

  return <TabMenu links={tabs} />;
};

export default Menu;
