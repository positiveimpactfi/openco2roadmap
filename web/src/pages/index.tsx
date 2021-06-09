import AdminOverview from "components/AdminOverview";
import { UserContext } from "context/UserContext";
import { useContext } from "react";

const Home = () => {
  const { user } = useContext(UserContext);

  if (user?.roles && user?.roles[0].name === "ADMIN") {
    return <AdminOverview />;
  }
  return <div>{user ? `Hello, ${user.email}` : "Hello, stranger"}</div>;
};

export default Home;
