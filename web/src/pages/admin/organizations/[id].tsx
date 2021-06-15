import { useGetUsersInOrnizationQuery } from "generated/graphql";
import { useRouter } from "next/router";
import AdminPanel from "views/AdminPanel";

const Organization: React.FC = () => {
  const router = useRouter();
  const orgId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const { data, error, loading } = useGetUsersInOrnizationQuery({
    variables: { organizationId: orgId },
  });

  if (error) {
    return <div>Error</div>;
  }

  if (loading) {
    return <div>loading...</div>;
  }

  if (!data?.getUsersInOrganization) {
    return <div>Something went wrong</div>;
  }

  return (
    <AdminPanel>
      <div className="flex flex-col space-x-2">
        <h2>Org id: {orgId}</h2>
        <h3>Users in organization:</h3>
        <ul>
          {data?.getUsersInOrganization?.map((u) => (
            <li key={u.id}>{u.email}</li>
          ))}
        </ul>
      </div>
    </AdminPanel>
  );
};

export default Organization;
