import { AccessDenied } from "components/AccessDenied";
import LoadingSpinner from "components/LoadingSpinner";
import { useMeQuery } from "graphql/queries/users/me.generated";
import { Headings } from "types/Headings";
import { isAdmin } from "utils/isAdmin";
import AdminPanel from "./AdminPanel";

const AdminsOnly: React.FC<Headings> = ({ title, description, children }) => {
  const { data, loading } = useMeQuery();

  const user = data?.me;
  if (loading) {
    return <LoadingSpinner />;
  }

  if (isAdmin(user)) {
    return (
      <AdminPanel title={title} description={description}>
        {children}
      </AdminPanel>
    );
  } else {
    return <AccessDenied />;
  }
};

export default AdminsOnly;
