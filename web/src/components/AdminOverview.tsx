import { useOrganizationsQuery } from "generated/graphql";

interface AdminOverview {}

const AdminOverview: React.FC<AdminOverview> = () => {
  const { data } = useOrganizationsQuery();
  const orgs = data?.organizations;
  return (
    <div>
      Admin panel
      <div>
        <h1>Organizations:</h1>
        {orgs?.map((o) => (
          <p key={o.id}>{o.name}</p>
        ))}
      </div>
    </div>
  );
};

export default AdminOverview;
