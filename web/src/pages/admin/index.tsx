import { UserContext } from "context/UserContext";
import { useContext, useState } from "react";
import { isAdmin } from "utils/isAdmin";
import AdminSidebar from "components/AdminSidebar";
import AdminOverview from "components/AdminOverview";

const AdminPanel = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useContext(UserContext);

  if (!isAdmin(user)) {
    return <div>Unathorized</div>;
  }
  return (
    <div className="h-screen flex overflow-hidden bg-white">
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <AdminOverview setSidebarOpen={setSidebarOpen} />
    </div>
  );
};

export default AdminPanel;
