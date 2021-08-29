import Container from "components/Common/Container";
import LoadingSpinner from "components/LoadingSpinner";
import { useMeQuery } from "generated/graphql";
import { isAdmin } from "utils/isAdmin";
import AdminPanel from "views/AdminPanel";
import { Headings } from "./Overview";

const AdminsOnly: React.FC<Headings> = ({ title, description, children }) => {
  const { data, loading } = useMeQuery();

  const user = data?.me;
  if (loading) {
    return (
      <Container>
        <LoadingSpinner />
      </Container>
    );
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
