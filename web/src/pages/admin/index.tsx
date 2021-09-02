import AdminsOnly from "components/Admin/AdminsOnly";
import LinksGrid from "components/LinksGrid";
import { adminLinks } from "data/adminLinks";

const AdminHome = () => {
  return (
    <AdminsOnly
      title="Hallintapaneeli MVP"
      description="Näillä sivuilla voit muokata CO2-laskurin asetuksia. "
    >
      <div className="flex flex-col">
        <LinksGrid links={adminLinks} />
      </div>
    </AdminsOnly>
  );
};

export default AdminHome;
