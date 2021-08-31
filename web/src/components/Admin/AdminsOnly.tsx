import LoadingSpinner from "components/LoadingSpinner";
import { useMeQuery } from "generated/graphql";
import { isAdmin } from "utils/isAdmin";
import AdminPanel, { Headings } from "./AdminPanel";

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
    return <div>Pääsy estetty</div>;
  }
};

export default AdminsOnly;
