import AdminPanel from "components/Admin/AdminPanel";
import { useGetUsersInOrnizationQuery } from "graphql/queries/users/usersInOrganization.generated";
import { useRouter } from "next/router";

const Organization: React.FC = () => {
  const router = useRouter();
  const orgId = router.query.id as string;
  const { data, error, loading } = useGetUsersInOrnizationQuery({
    variables: { organizationID: orgId },
  });

  if (error) {
    return <div>Error</div>;
  }

  if (loading) {
    return <div>loading...</div>;
  }

  if (!data?.usersInOrganization) {
    return <div>Something went wrong</div>;
  }

  return (
    <AdminPanel>
      <div className="flex flex-col space-x-2">
        <h2>Org id: {orgId}</h2>
        <h3>Users in organization:</h3>
        <ul>
          {data?.usersInOrganization?.map((u) => (
            <li key={u.id}>{u.email}</li>
          ))}
        </ul>
      </div>
    </AdminPanel>
  );
};

export default Organization;
