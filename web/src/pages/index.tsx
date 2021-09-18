import LoadingSpinner from "components/LoadingSpinner";
import { useMeQuery } from "graphql/queries/users/me.generated";
import { User } from "types/generatedTypes";
import Link from "next/link";
import { withAuth } from "components/Auth";
import LinksGrid from "components/LinksGrid";
import { sidebarLinks } from "data/links/sidebarLinks";

const Home = () => {
  const { data, loading } = useMeQuery();
  const user = data?.me;
  if (loading) {
    return <LoadingSpinner />;
  }

  return <UserLoggedIn user={user} />;
};

const UserLoggedIn: React.FC<{ user: Partial<User> }> = ({ user }) => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-4">
      <h2 className="text-xl mb-4">{`Moi, ${user.firstName ?? user.email}`}</h2>

      <div className="flex flex-col items-start">
        <LinksGrid links={sidebarLinks} />
      </div>
    </div>
  );
};

export default withAuth(Home);
