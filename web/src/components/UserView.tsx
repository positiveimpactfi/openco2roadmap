import { useMeQuery } from "graphql/queries/users/me.generated";
import { GenericUser } from "pages/admin/users";
import Button from "./Button";

const UserView: React.FC<{
  user: GenericUser;
  onClose: (val: boolean) => void;
}> = ({ user, onClose }) => {
  const { data } = useMeQuery();
  if (!data.me) {
    return null;
  }

  return (
    <div>
      <div>
        Nimi: {user.firstName} {user.lastName}
      </div>
      <div>Sähköposti: {user.email}</div>
      <div>
        Yrityksen nimi:
        {user.organizationName === ""
          ? data?.me?.organizations[0]?.name
          : user.organizationName}
      </div>
      <div className="mt-2">
        <Button variant="success" onClick={() => onClose(false)}>
          Sulje
        </Button>
      </div>
    </div>
  );
};

export default UserView;
