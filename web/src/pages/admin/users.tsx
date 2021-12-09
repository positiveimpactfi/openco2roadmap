import AdminsOnly from "components/Admin/AdminsOnly";
import { withAuth } from "components/Auth";
import Button from "components/Button";
import CreateUserForm from "components/Forms/User/CreateUserForm";
import InviteUserForm from "components/Forms/User/InviteUserForm";
import LoadingSpinner from "components/LoadingSpinner";
import Notification from "components/Notification";
import OptionsMenu from "components/OptionsMenu";
import SlideOver from "components/SlideOver";
import Table, { TableCell } from "components/Table";
import UserView from "components/UserView";
import { useCancelUserInviteMutation } from "graphql/mutations/user/cancelUserInvite.generated";
import { useSendInvitationReminderMutation } from "graphql/mutations/user/sendInvitationReminder.generated";
import {
  AllInvitedUsersDocument,
  useAllInvitedUsersQuery,
} from "graphql/queries/users/allInvitedUsers.generated";
import { useAllUsersQuery } from "graphql/queries/users/allUsers.generated";
import { useMeQuery } from "graphql/queries/users/me.generated";
import { useMyOrganizationUsersQuery } from "graphql/queries/users/myOrganizationUsers.generated";
import { useState } from "react";
import { InvitedUser, User } from "types/generatedTypes";
import { isSuperAdmin } from "utils/isAdmin";

const UsersPage = () => {
  const { data } = useMeQuery();
  const [sendReminder] = useSendInvitationReminderMutation();
  const [cancelInvite] = useCancelUserInviteMutation();
  const [userViewOpen, setUserViewOpen] = useState(false);
  const [inviteFormOpen, setInviteFormOpen] = useState(false);
  const [addFormOpen, setAddFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState<string>(null);

  const handleShowUser = (user: User) => {
    setSelectedUser(user);
    setUserViewOpen(true);
  };

  const handleAddUser = () => {
    setNotificationText("Käyttäjä lisätty");
    setShowNotification(true);
  };

  const handleSendUserInvite = () => {
    setNotificationText("Kutsu lähetetty");
    setShowNotification(true);
  };

  const handleSendReminder = async (user: InvitedUser) => {
    const res = await sendReminder({
      variables: { token: user.id.split(";").slice(1).join(";") },
    });
    if (!res?.data?.sendInvitationReminder) {
      console.log("could not send reminder");
    } else {
      setNotificationText("Muistutus lähetetty");
      setShowNotification(true);
    }
  };

  const handleCancelUserInvite = async (user: InvitedUser) => {
    const res = await cancelInvite({
      variables: {
        token: user.id.split(";").slice(1).join(";"),
      },
      refetchQueries: [AllInvitedUsersDocument],
    });
    if (!res?.data?.cancelUserInvite) {
      console.log("could not cancel invite");
    } else {
      setNotificationText("Kutsu peruttu onnistuneesti");
      setShowNotification(true);
    }
  };
  return (
    <AdminsOnly
      title="Käyttäjät"
      description="Tällä sivulla voit kutsua, lisätä, muokata ja poistaa käyttäjiä laskuriin."
    >
      <div>
        <Notification
          title="Hienoa!"
          description={notificationText}
          show={showNotification}
          setShow={setShowNotification}
        />
        <SlideOver
          title="Käyttäjän tiedot"
          open={userViewOpen}
          setOpen={setUserViewOpen}
        >
          <UserView user={selectedUser} onClose={setUserViewOpen} />
        </SlideOver>
        <SlideOver
          title="Kutsu käyttäjä"
          open={inviteFormOpen}
          setOpen={setInviteFormOpen}
        >
          <InviteUserForm
            setOpen={setInviteFormOpen}
            onSuccess={handleSendUserInvite}
          />
        </SlideOver>
        <SlideOver
          title="Lisää käyttäjä"
          open={addFormOpen}
          setOpen={setAddFormOpen}
        >
          <CreateUserForm setOpen={setAddFormOpen} onSuccess={handleAddUser} />
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
          <SuperAdminUserTable
            handleFormOpen={handleShowUser}
            handleSendReminder={handleSendReminder}
            handleCancelInvite={handleCancelUserInvite}
          />
        ) : (
          <CompanyUsersTable
            handleFormOpen={handleShowUser}
            handleSendReminder={handleSendReminder}
            handleCancelInvite={handleCancelUserInvite}
          />
        )}
      </div>
    </AdminsOnly>
  );
};

const CompanyUsersTable: React.FC<{
  handleFormOpen: (val: Partial<User>) => void;
  handleSendReminder: (val: InvitedUser) => void;
  handleCancelInvite: (val: InvitedUser) => void;
}> = ({ handleFormOpen, handleSendReminder, handleCancelInvite }) => {
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
                  "Toiminnot",
                ]}
              >
                {invitedUsers?.map((user) => (
                  <tr key={user.id}>
                    <TableCell value={"--"} />
                    <TableCell value={"--"} />
                    <TableCell value={user.email} />
                    <TableCell value="Kutsuttu" />
                    <td className="px-6 py-1 whitespace-nowrap text-right text-sm font-medium">
                      <OptionsMenu
                        onShow={() => handleSendReminder(user as InvitedUser)}
                        onShowText="Lähetä muistutus"
                        onDelete={() => handleCancelInvite(user as InvitedUser)}
                        onDeleteText="Peru kutsu"
                      />
                    </td>
                  </tr>
                ))}
                {users?.map((user) => (
                  <tr key={user.id}>
                    <TableCell value={user.lastName ?? "--"} />
                    <TableCell value={user.firstName ?? "--"} />
                    <TableCell value={user.email} />
                    <TableCell value="Aktiivinen" />
                    <td className="px-6 py-1 whitespace-nowrap text-right text-sm font-medium">
                      <OptionsMenu
                        onShow={() => handleFormOpen(user)}
                        onShowText="Näytä tiedot"
                      />
                    </td>
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

const SuperAdminUserTable: React.FC<{
  handleFormOpen: (val: User) => void;
  handleSendReminder: (val: InvitedUser) => void;
  handleCancelInvite: (val: InvitedUser) => void;
}> = ({ handleFormOpen, handleSendReminder, handleCancelInvite }) => {
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
                  "Toiminnot",
                ]}
              >
                {invitedUsers?.map((user) => (
                  <tr key={user.id}>
                    <TableCell value={"--"} />
                    <TableCell value={"--"} />
                    <TableCell value={user.email} />
                    <TableCell value="Kutsuttu" />
                    <TableCell value={user.organization.name} />
                    <td className="px-6 py-1 whitespace-nowrap text-right text-sm font-medium">
                      <OptionsMenu
                        onShow={() => handleSendReminder(user as InvitedUser)}
                        onShowText="Lähetä muistutus"
                        onDelete={() => handleCancelInvite(user as InvitedUser)}
                        onDeleteText="Peru kutsu"
                      />
                    </td>
                  </tr>
                ))}
                {users?.map((user) => (
                  <tr key={user.id}>
                    <TableCell value={user.lastName ?? "--"} />
                    <TableCell value={user.firstName ?? "--"} />
                    <TableCell value={user.email} />
                    <TableCell value="Aktiivinen" />
                    <TableCell value={user.organizations[0]?.name} />
                    <td className="px-6 py-1 whitespace-nowrap text-right text-sm font-medium">
                      <OptionsMenu
                        onShow={() => handleFormOpen(user)}
                        onShowText="Näytä tiedot"
                      />
                    </td>
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
