import AdminsOnly from "components/Admin/AdminsOnly";
import LinksGrid from "components/LinksGrid";

const AdminHome = () => {
  return (
    <AdminsOnly
      title="Hallintapaneeli MVP"
      description="Näillä sivuilla voit muokata CO2-laskurin asetuksia. "
    >
      <div className="flex flex-col">
        <LinksGrid />
      </div>
    </AdminsOnly>
  );
};

export default AdminHome;
