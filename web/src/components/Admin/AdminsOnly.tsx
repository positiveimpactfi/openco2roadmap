import { AccessDenied } from "components/AccessDenied";
import LoadingSpinner from "components/LoadingSpinner";
import { useMeQuery } from "graphql/queries/users/me.generated";
import { Headings } from "types/Headings";
import { isAdmin, isSuperAdmin } from "utils/isAdmin";
import AdminPanel from "./AdminPanel";

type AuthProp = Headings & {
  onlySuperAdmin?: boolean;
};

const AdminsOnly: React.FC<AuthProp> = ({
  title,
  description,
  onlySuperAdmin = false,
  children,
}) => {
  const { data, loading } = useMeQuery();

  const user = data?.me;
  if (onlySuperAdmin) {
    if (isSuperAdmin(user)) {
      return (
        <AdminPanel title={title} description={description}>
          {loading ? <LoadingSpinner /> : children}
        </AdminPanel>
      );
    } else {
      return <AccessDenied />;
    }
  } else if (isAdmin(user)) {
    return (
      <AdminPanel title={title} description={description}>
        {loading ? <LoadingSpinner /> : children}
      </AdminPanel>
    );
  } else {
    return <AccessDenied />;
  }
};

export default AdminsOnly;
