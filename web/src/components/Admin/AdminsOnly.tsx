import { UserContext } from "context/UserContext";
import { useContext } from "react";
import { isAdmin } from "utils/isAdmin";
import AdminPanel from "views/AdminPanel";

const AdminsOnly = ({ children }) => {
  const { user } = useContext(UserContext);

  if (isAdmin(user)) {
    return <AdminPanel>{children}</AdminPanel>;
  } else {
    return <div>Pääsy estetty</div>;
  }
};

export default AdminsOnly;
