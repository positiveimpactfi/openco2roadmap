import AdminsOnly from "components/Admin/AdminsOnly";
import { withAuth } from "components/Auth";
import Button from "components/Button";
import CreateUserForm from "components/Forms/User/CreateUserForm";
import InviteUserForm from "components/Forms/User/InviteUserForm";
import LoadingSpinner from "components/LoadingSpinner";
import Notification from "components/Notification";
import OptionsMenu from "components/OptionsMenu";
import SlideOver from "components/SlideOver";
import { Table } from "components/Tables/Table";
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
import { Translate } from "next-translate";
import useTranslation from "next-translate/useTranslation";
import { useMemo, useState } from "react";
import { Column } from "react-table";
import { isSuperAdmin } from "utils/isAdmin";

export interface GenericUser {
  id: string;
  type: "InvitedUser" | "User";
  lastName: string;
  firstName: string;
  email: string;
  status: "Kutsuttu" | "Aktiivinen";
  organizationName: string;
}

const UsersPage = () => {
  const { t } = useTranslation("admin");
  const { data } = useMeQuery();
  const [sendReminder] = useSendInvitationReminderMutation();
  const [cancelInvite] = useCancelUserInviteMutation();
  const [userViewOpen, setUserViewOpen] = useState(false);
  const [inviteFormOpen, setInviteFormOpen] = useState(false);
  const [addFormOpen, setAddFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<GenericUser | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState<string>(null);

  const handleShowUser = (user: GenericUser) => {
    setSelectedUser(user);
    setUserViewOpen(true);
  };

  const handleAddUser = () => {
    setNotificationText(t("pages.users.actions.add_user.success"));
    setShowNotification(true);
  };

  const handleSendUserInvite = () => {
    setNotificationText(t("pages.users.actions.invite_user.success"));
    setShowNotification(true);
  };

  const handleSendReminder = async (user: GenericUser) => {
    const res = await sendReminder({
      variables: { token: user.id.split(";").slice(1).join(";") },
    });
    if (!res?.data?.sendInvitationReminder) {
      console.log("could not send reminder");
    } else {
      setNotificationText(t("pages.users.actions.send_reminder.success"));
      setShowNotification(true);
    }
  };

  const handleCancelUserInvite = async (user: GenericUser) => {
    const res = await cancelInvite({
      variables: {
        token: user.id.split(";").slice(1).join(";"),
      },
      refetchQueries: [AllInvitedUsersDocument],
    });
    if (!res?.data?.cancelUserInvite) {
      console.log("could not cancel invite");
    } else {
      setNotificationText(t("pages.users.actions.cancel_invite.success"));
      setShowNotification(true);
    }
  };
  return (
    <AdminsOnly
      title={t("pages.users.title")}
      description={t("pages.users.description_long")}
    >
      <div>
        <Notification
          title="Hienoa!"
          description={notificationText}
          show={showNotification}
          setShow={setShowNotification}
        />
        <SlideOver
          title={t("pages.users.actions.show_user.title")}
          open={userViewOpen}
          setOpen={setUserViewOpen}
        >
          <UserView user={selectedUser} onClose={setUserViewOpen} />
        </SlideOver>
        <SlideOver
          title={t("pages.users.actions.invite_user.title")}
          open={inviteFormOpen}
          setOpen={setInviteFormOpen}
        >
          <InviteUserForm
            setOpen={setInviteFormOpen}
            onSuccess={handleSendUserInvite}
          />
        </SlideOver>
        <SlideOver
          title={t("pages.users.actions.add_user.title")}
          open={addFormOpen}
          setOpen={setAddFormOpen}
        >
          <CreateUserForm setOpen={setAddFormOpen} onSuccess={handleAddUser} />
        </SlideOver>
        <div className="mb-4 flex space-x-2">
          <Button
            variant="success"
            onClick={() => setInviteFormOpen(true)}
            // disabled
          >
            {t("pages.users.actions.invite_user.title")}
          </Button>
          <Button variant="success" onClick={() => setAddFormOpen(true)}>
            {t("pages.users.actions.add_user.title")}
          </Button>
        </div>
        {isSuperAdmin(data?.me) ? (
          <SuperAdminUserTable
            handleFormOpen={handleShowUser}
            handleSendReminder={handleSendReminder}
            handleCancelInvite={handleCancelUserInvite}
            t={t}
          />
        ) : (
          <CompanyUsersTable
            handleFormOpen={handleShowUser}
            handleSendReminder={handleSendReminder}
            handleCancelInvite={handleCancelUserInvite}
            t={t}
          />
        )}
      </div>
    </AdminsOnly>
  );
};

const CompanyUsersTable: React.FC<{
  handleFormOpen: (val: GenericUser) => void;
  handleSendReminder: (val: GenericUser) => void;
  handleCancelInvite: (val: GenericUser) => void;
  t: Translate;
}> = ({ handleFormOpen, handleSendReminder, handleCancelInvite, t }) => {
  const { data, loading } = useMyOrganizationUsersQuery();
  const { data: invited } = useAllInvitedUsersQuery();

  const columns = useMemo<Column[]>(
    () => [
      {
        Header: "Sukunimi",
        accessor: "lastName",
      },
      {
        Header: "Etunimi",
        accessor: "firstName",
      },
      {
        Header: "Sähköposti",
        accessor: "email",
      },
      {
        Header: "Status",
        accessor: "status",
      },

      {
        Header: "Toiminnot",
        disableSortBy: true,
        Cell: ({ row }) => {
          const user = row.original as GenericUser;
          if (user.type === "User") {
            return (
              <OptionsMenu
                onShow={() => handleFormOpen(user)}
                onShowText="Näytä tiedot"
              />
            );
          } else if (user.type === "InvitedUser") {
            return (
              <OptionsMenu
                onShow={() => handleSendReminder(user)}
                onShowText={t("pages.users.actions.send_reminder.title")}
                onDelete={() => handleCancelInvite(user)}
                onDeleteText={t("pages.users.actions.cancel_invite.title")}
              />
            );
          }
        },
      },
    ],
    [handleFormOpen, handleSendReminder, handleCancelInvite, t]
  );
  const tableData = useMemo(() => {
    const invitedUsers = invited?.allInvitedUsers?.map((u) => {
      return {
        id: u.id,
        type: u.__typename,
        lastName: "",
        firstName: "",
        email: u.email,
        status: "Kutsuttu",
        organizationName: u.organization.name,
      };
    }) as GenericUser[];
    const existingUsers = data?.myOrganizationUsers?.map((u) => {
      return {
        id: u.id,
        type: u.__typename,
        lastName: u.lastName,
        firstName: u.firstName,
        email: u.email,
        status: "Aktiivinen",
        organizationName: "",
      };
    }) as GenericUser[];
    return invitedUsers?.concat(existingUsers) ?? [];
  }, [data, invited]);
  return (
    <div className="flex flex-col">
      <div className="-my-2  sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <Table columns={columns} data={tableData} />
          )}
        </div>
      </div>
    </div>
  );
};

const SuperAdminUserTable: React.FC<{
  handleFormOpen: (val: GenericUser) => void;
  handleSendReminder: (val: GenericUser) => void;
  handleCancelInvite: (val: GenericUser) => void;
  t: Translate;
}> = ({ handleFormOpen, handleSendReminder, handleCancelInvite, t }) => {
  const { data, loading } = useAllUsersQuery();
  const { data: invited } = useAllInvitedUsersQuery();
  const columns = useMemo<Column[]>(
    () => [
      {
        Header: "Sukunimi",
        accessor: "lastName",
      },
      {
        Header: "Etunimi",
        accessor: "firstName",
      },
      {
        Header: "Sähköposti",
        accessor: "email",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Yritykset",
        accessor: "organizationName",
      },
      {
        Header: "Toiminnot",
        disableSortBy: true,
        Cell: ({ row }) => {
          const user = row.original as GenericUser;
          if (user.type === "User") {
            return (
              <OptionsMenu
                onShow={() => handleFormOpen(user)}
                onShowText="Näytä tiedot"
              />
            );
          } else if (user.type === "InvitedUser") {
            return (
              <OptionsMenu
                onShow={() => handleSendReminder(user)}
                onShowText={t("pages.users.actions.send_reminder.title")}
                onDelete={() => handleCancelInvite(user)}
                onDeleteText={t("pages.users.actions.cancel_invite.title")}
              />
            );
          }
        },
      },
    ],
    [handleFormOpen, handleSendReminder, handleCancelInvite, t]
  );
  const tableData = useMemo(() => {
    const invitedUsers = invited?.allInvitedUsers?.map((u) => {
      return {
        id: u.id,
        type: u.__typename,
        lastName: "",
        firstName: "",
        email: u.email,
        status: "Kutsuttu",
        organizationName: u.organization.name,
      };
    }) as GenericUser[];
    const existingUsers = data?.allUsers?.map((u) => {
      return {
        id: u.id,
        type: u.__typename,
        lastName: u.lastName,
        firstName: u.firstName,
        email: u.email,
        status: "Aktiivinen",
        organizationName: u.organizations[0]?.name,
      };
    }) as GenericUser[];
    return invitedUsers?.concat(existingUsers) ?? [];
  }, [data, invited]);
  return (
    <div className="flex flex-col">
      <div className="-my-2 sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <Table columns={columns} data={tableData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default withAuth(UsersPage);
