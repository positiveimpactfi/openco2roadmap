import AdminsOnly from "components/Admin/AdminsOnly";
import LinksGrid from "components/LinksGrid";

const AdminHome = () => {
  return (
    <AdminsOnly>
      <div className="flex flex-col">
        <LinksGrid />
      </div>
    </AdminsOnly>
  );
};

export default AdminHome;
