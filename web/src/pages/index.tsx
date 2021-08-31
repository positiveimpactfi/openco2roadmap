import LoadingSpinner from "components/LoadingSpinner";
import { useMeQuery, User } from "generated/graphql";
import Link from "next/link";

const Home = () => {
  const { data, loading } = useMeQuery();
  const user = data?.me;
  if (loading) {
    return (
      <div className="flex h-full justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      {user ? <UserLoggedIn user={user} /> : <UserNotLoggedIn />}
    </div>
  );
};

const UserLoggedIn: React.FC<{ user: Partial<User> }> = ({ user }) => {
  return (
    <div className="flex flex-col h-full items-center justify-center w-full flex-1 px-20 text-center">
      <div>{`Moi, ${user.email}`}</div>
      <Link href="/admin" passHref>
        <a className="font-medium text-teal-600 hover:text-teal-500">
          Siirry admin dashbordille
        </a>
      </Link>
    </div>
  );
};

const UserNotLoggedIn = () => {
  return (
    <div className="flex flex-col h-full items-center justify-center">
      <div>Et ole kirjautunut!</div>
      <div>
        <Link href="/login" passHref>
          <a className="font-medium text-teal-600 hover:text-teal-500">
            Kirjautumaan
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Home;
