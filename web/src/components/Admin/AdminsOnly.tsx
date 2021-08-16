import { UserContext } from "context/UserContext";
import { useContext } from "react";
import { isAdmin } from "utils/isAdmin";
import AdminPanel from "views/AdminPanel";
import { Headings } from "./Overview";

const AdminsOnly: React.FC<Headings> = ({ title, description, children }) => {
  const { user } = useContext(UserContext);

  if (isAdmin(user)) {
    return (
      <AdminPanel title={title} description={description}>
        {children}
      </AdminPanel>
    );
  } else {
    return <div>Pääsy estetty</div>;
  }
};

export default AdminsOnly;
