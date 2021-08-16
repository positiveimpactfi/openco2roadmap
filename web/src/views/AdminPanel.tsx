import AdminOverview, { Headings } from "components/Admin/Overview";
import AdminSidebar from "components/Admin/Sidebar";
import { useState } from "react";

const AdminPanel: React.FC<Headings> = ({ title, description, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex overflow-hidden bg-white">
      <AdminSidebar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
      <AdminOverview
        setSidebarOpen={setSidebarOpen}
        title={title}
        description={description}
      >
        {children}
      </AdminOverview>
    </div>
  );
};

export default AdminPanel;
