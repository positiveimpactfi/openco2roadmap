import AdminsOnly from "components/Admin/AdminsOnly";
import LinksGrid from "components/LinksGrid";
import { adminLinks } from "data/adminLinks";

const AdminHome = () => {
  const activeLinks = adminLinks.filter((link) => !link.disabled);
  return (
    <AdminsOnly
      title="Hallintapaneeli MVP"
      description="Näillä sivuilla voit muokata CO2-laskurin asetuksia. "
    >
      <div className="flex flex-col items-start">
        <LinksGrid links={activeLinks} />
      </div>
    </AdminsOnly>
  );
};

export default AdminHome;
