import AdminPanel from "views/AdminPanel";
import { UserContext } from "context/UserContext";
import { useContext } from "react";

const Home = () => {
  const { user } = useContext(UserContext);

  if (user?.roles && user?.roles[0].name === "ADMIN") {
    return <AdminPanel> Hello, {user.email}</AdminPanel>;
  }
  return <div>{user ? `Hello, ${user.email}` : "Hello, stranger"}</div>;
};

export default Home;
