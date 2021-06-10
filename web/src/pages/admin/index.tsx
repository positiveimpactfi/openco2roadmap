import { UserContext } from "context/UserContext";
import { useContext } from "react";
import { isAdmin } from "utils/isAdmin";
import AdminSidebar from "components/AdminSidebar";

const AdminPanel = () => {
  const { user } = useContext(UserContext);

  if (!isAdmin(user)) {
    return <div>Unathorized</div>;
  }
  return (
    <>
      <AdminSidebar />
    </>
  );
};

export default AdminPanel;
