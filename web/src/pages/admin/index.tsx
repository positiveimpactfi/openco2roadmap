import AdminsOnly from "components/Admin/AdminsOnly";
import { withAuth } from "components/Auth";
import LinksGrid from "components/LinksGrid";
import { adminLinks, companyAdminLinks } from "data/links/adminLinks";
import { useUser } from "hooks/useUser";
import useTranslation from "next-translate/useTranslation";
import { isSuperAdmin } from "utils/isAdmin";

const AdminHome = () => {
  const { t } = useTranslation("admin");
  const { user } = useUser();
  const activeLinks = adminLinks.filter((link) => !link.disabled);

  return (
    <AdminsOnly
      title={t("pages.home.title")}
      description={t("pages.home.description")}
    >
      <div className="flex flex-col items-start">
        <LinksGrid
          links={
            isSuperAdmin(user)
              ? adminLinks
              : activeLinks.filter((link) =>
                  companyAdminLinks.includes(link.href)
                )
          }
          namespace="admin"
        />
      </div>
    </AdminsOnly>
  );
};

export default withAuth(AdminHome);
