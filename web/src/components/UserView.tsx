import { useMeQuery } from "graphql/queries/users/me.generated";
import { User } from "types/generatedTypes";
import Button from "./Button";

const UserView: React.FC<{ user: User; onClose: (val: boolean) => void }> = ({
  user,
  onClose,
}) => {
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
        {user.organizations
          ? user.organizations[0].name
          : data.me.organizations[0].name}
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
