import { UserContext } from "context/UserContext";
import { useContext } from "react";

const Home = () => {
  const { user } = useContext(UserContext);

  return <div>{user ? `Hello, ${user.email}` : "Hello, stranger"}</div>;
};

export default Home;
