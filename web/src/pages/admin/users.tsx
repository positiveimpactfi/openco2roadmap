import AdminsOnly from "components/Admin/AdminsOnly";
import { withAuth } from "components/Auth";
import Button from "components/Button";
import CreateUserForm from "components/Forms/User/CreateUserForm";
import InviteUserForm from "components/Forms/User/InviteUserForm";
import LoadingSpinner from "components/LoadingSpinner";
import SlideOver from "components/SlideOver";
import Table, { TableCell, TableCellOpenOptions } from "components/Table";
import { useAllInvitedUsersQuery } from "graphql/queries/users/allInvitedUsers.generated";
import { useAllUsersQuery } from "graphql/queries/users/allUsers.generated";
import { useMeQuery } from "graphql/queries/users/me.generated";
import { useMyOrganizationUsersQuery } from "graphql/queries/users/myOrganizationUsers.generated";
import { useState } from "react";
import { User } from "types/generatedTypes";
import { isSuperAdmin } from "utils/isAdmin";

const UsersPage = () => {
  const { data } = useMeQuery();
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
          <InviteUserForm setOpen={setInviteFormOpen} />
        </SlideOver>
        <SlideOver
          title="Lisää käyttäjä"
          open={addFormOpen}
          setOpen={setAddFormOpen}
        >
          <CreateUserForm setOpen={setAddFormOpen} />
        </SlideOver>
        <div className="flex space-x-2 mb-4">
          <Button
            variant="success"
            onClick={() => setInviteFormOpen(true)}
            // disabled
          >
            Kutsu käyttäjä
          </Button>
          <Button variant="success" onClick={() => setAddFormOpen(true)}>
            Lisää käyttäjä
          </Button>
        </div>
        {isSuperAdmin(data?.me) ? (
          <SuperAdminUserTable handleFormOpen={handleEditUser} />
        ) : (
          <CompanyUsersTable handleFormOpen={handleEditUser} />
        )}
      </div>
    </AdminsOnly>
  );
};

const CompanyUsersTable: React.FC<{
  handleFormOpen: (val: Partial<User>) => void;
}> = ({ handleFormOpen }) => {
  const { data, loading } = useMyOrganizationUsersQuery();
  const { data: invited } = useAllInvitedUsersQuery();
  const users = data?.myOrganizationUsers;
  const invitedUsers = invited?.allInvitedUsers;
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <Table
                alignLastRight
                headers={[
                  "Sukunimi",
                  "Etunimi",
                  "Sähköposti",
                  "Status",
                  "Muokkaa",
                ]}
              >
                {invitedUsers?.map((user) => (
                  <tr key={user.id}>
                    <TableCell value={"--"} />
                    <TableCell value={"--"} />
                    <TableCell value={user.email} />
                    <TableCell value="Kutsuttu" />
                    <TableCellOpenOptions
                      fn={() => console.log("invited user clicked")}
                    />
                  </tr>
                ))}
                {users?.map((user) => (
                  <tr key={user.id}>
                    <TableCell value={user.lastName ?? "--"} />
                    <TableCell value={user.firstName ?? "--"} />
                    <TableCell value={user.email} />
                    <TableCell value="Aktiivinen" />
                    <TableCellOpenOptions fn={() => handleFormOpen(user)} />
                  </tr>
                ))}
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SuperAdminUserTable: React.FC<{ handleFormOpen: (val: User) => void }> =
  ({ handleFormOpen }) => {
    const { data, loading } = useAllUsersQuery();
    const { data: invited } = useAllInvitedUsersQuery();
    const users = data?.allUsers;
    const invitedUsers = invited?.allInvitedUsers;
    return (
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            {loading ? (
              <LoadingSpinner />
            ) : (
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <Table
                  alignLastRight
                  headers={[
                    "Sukunimi",
                    "Etunimi",
                    "Sähköposti",
                    "Status",
                    "Yritykset",
                    "Muokkaa",
                  ]}
                >
                  {invitedUsers?.map((user) => (
                    <tr key={user.id}>
                      <TableCell value={"--"} />
                      <TableCell value={"--"} />
                      <TableCell value={user.email} />
                      <TableCell value="Kutsuttu" />
                      <TableCell value={user.organization.name} />
                      <TableCellOpenOptions
                        fn={() => console.log("invited user clicked")}
                      />
                    </tr>
                  ))}
                  {users?.map((user) => (
                    <tr key={user.id}>
                      <TableCell value={user.lastName ?? "--"} />
                      <TableCell value={user.firstName ?? "--"} />
                      <TableCell value={user.email} />
                      <TableCell value="Aktiivinen" />
                      <TableCell value={user.organizations[0]?.name} />
                      <TableCellOpenOptions fn={() => handleFormOpen(user)} />
                    </tr>
                  ))}
                </Table>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

export default withAuth(UsersPage);
