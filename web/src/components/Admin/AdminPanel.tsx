import PageWithTabs from "components/Layout/PageWithTabs";
import { adminLinks } from "data/links/adminLinks";
import { useRouter } from "next/router";
import { Headings } from "types/Headings";
import { PageLink } from "types/PageLink";

const AdminPanel: React.FC<Headings> = ({ title, description, children }) => {
  const router = useRouter();
  const currentTab: PageLink = {
    name: "Hallintapaneeli",
    description: "Hallintapaneeli - Etusivu",
    href: "/admin",
    current: router.pathname === "/admin",
  };
  const activeLinks = adminLinks.filter((link) => !link.disabled);
  const links = [currentTab, ...activeLinks];
  return (
    <PageWithTabs title={title} description={description} links={links}>
      {children}
    </PageWithTabs>
  );
};

export default AdminPanel;
