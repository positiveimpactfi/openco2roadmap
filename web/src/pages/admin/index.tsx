import AdminsOnly from "components/Admin/AdminsOnly";
import { withAuth } from "components/Auth";
import LinksGrid from "components/LinksGrid";
import { adminLinks, companyAdminLinks } from "data/links/adminLinks";
import { useUser } from "hooks/useUser";
import { isSuperAdmin } from "utils/isAdmin";

const AdminHome = () => {
  const { user } = useUser();
  const activeLinks = adminLinks.filter((link) => !link.disabled);

  return (
    <AdminsOnly
      title="Hallintapaneeli"
      description="Näillä sivuilla voit muokata CO2-laskurin asetuksia. "
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
        />
      </div>
    </AdminsOnly>
  );
};

export default withAuth(AdminHome);
