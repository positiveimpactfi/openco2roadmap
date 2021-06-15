import AdminOverview from "components/AdminOverview";
import AdminSidebar from "components/AdminSidebar";
import { useState } from "react";

const AdminPanel = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex overflow-hidden bg-white">
      <AdminSidebar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
      <AdminOverview setSidebarOpen={setSidebarOpen}>{children}</AdminOverview>
    </div>
  );
};

export default AdminPanel;
