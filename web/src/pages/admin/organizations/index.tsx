import { useOrganizationsQuery } from "generated/graphql";
import AdminPanel from "views/AdminPanel";

const Organizations = () => {
  const { data, loading } = useOrganizationsQuery();
  return (
    <>
      {loading ? (
        <div> Loading...</div>
      ) : (
        <AdminPanel>
          <div>
            <ul>
              {data?.organizations?.map((o) => (
                <li key={o.id}>
                  {o.name} {o.id}
                </li>
              ))}
            </ul>
          </div>
        </AdminPanel>
      )}
    </>
  );
};

export default Organizations;
