import PageWithTabs from "components/Layout/PageWithTabs";
import { adminLinks, companyAdminLinks } from "data/links/adminLinks";
import { useUser } from "hooks/useUser";
import { useRouter } from "next/router";
import { Headings } from "types/Headings";
import { PageLink } from "types/PageLink";
import { isSuperAdmin } from "utils/isAdmin";

const AdminPanel: React.FC<Headings> = ({ title, description, children }) => {
  const { user } = useUser();
  const router = useRouter();
  const currentTab: PageLink = {
    name: "Hallintapaneeli",
    description: "Hallintapaneeli - Etusivu",
    href: "/admin",
    current: router.pathname === "/admin",
  };
  const activeLinks = isSuperAdmin(user)
    ? adminLinks
    : adminLinks
        .filter((link) => !link.disabled)
        .filter((link) => companyAdminLinks.includes(link.href));
  const links = [currentTab, ...activeLinks];
  return (
    <PageWithTabs title={title} description={description} links={links}>
      {children}
    </PageWithTabs>
  );
};

export default AdminPanel;
