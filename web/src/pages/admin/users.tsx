import AdminsOnly from "components/Admin/AdminsOnly";
import Button from "components/Button";
import CreateUserForm from "components/Forms/User/CreateUserForm";
import SlideOver from "components/SlideOver";
import Table, { TableCell, TableCellOpenOptions } from "components/Table";
import { useAllUsersQuery } from "graphql/queries/users/allUsers.generated";
import { useState } from "react";
import { User } from "types";

const UsersPage = () => {
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [inviteFormOpen, setInviteFormOpen] = useState(false);
  const [addFormOpen, setAddFormOpen] = useState(false);
  const [userUnderEdit, setUserUnderEdit] = useState<User | null>(null);

  const handleEditUser = (user: User) => {
    setUserUnderEdit(user);
    setEditFormOpen(true);
  };
  return (
    <AdminsOnly
      title="Käyttäjät"
      description="Tällä sivulla voit kutsua, lisätä, muokata ja poistaa käyttäjiä laskuriin."
    >
      <div>
        <SlideOver
          title="Muokkaa käyttäjää"
          open={editFormOpen}
          setOpen={setEditFormOpen}
        >
          Edit user form
        </SlideOver>
        <SlideOver
          title="Kutsu käyttäjä"
          open={inviteFormOpen}
          setOpen={setInviteFormOpen}
        >
          Invite user form
        </SlideOver>
        <SlideOver
          title="Lisää käyttäjää"
          open={addFormOpen}
          setOpen={setAddFormOpen}
        >
          <CreateUserForm setOpen={setAddFormOpen} />
        </SlideOver>
        <div className="flex space-x-2">
          <Button onClick={() => setInviteFormOpen(true)}>
            Kutsu käyttäjä
          </Button>
          <Button onClick={() => setAddFormOpen(true)}>Lisää käyttäjä</Button>
        </div>
        <UsersTable handleFormOpen={handleEditUser} />
      </div>
    </AdminsOnly>
  );
};

const UsersTable: React.FC<{ handleFormOpen: (val: User) => void }> = ({
  handleFormOpen,
}) => {
  const { data, loading } = useAllUsersQuery();
  if (loading) return <div>loading...</div>;
  if (!data.allUsers) return <div>no users</div>;
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <Table
              headers={[
                "Sukunimi",
                "Etunimi",
                "Sähköposti",
                "Luotu",
                "Yritykset",
                "Muokkaa",
              ]}
            >
              {data.allUsers?.map((user) => (
                <tr key={user.id}>
                  <TableCell value={user.lastName} />
                  <TableCell value={user.firstName} />
                  <TableCell value={user.email} />
                  <TableCell value="10.10.2020" />
                  <TableCell value={user.organizations[0]?.name} />
                  <TableCellOpenOptions fn={() => handleFormOpen(user)} />
                </tr>
              ))}
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
