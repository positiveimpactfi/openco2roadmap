import { withAuth } from "components/Auth";
import ChangePasswordForm from "components/Forms/Auth/ChangePasswordForm";
import { useRouter } from "next/router";

const ChangePasswordPage: React.FC = ({}) => {
  const router = useRouter();
  const token =
    typeof router.query.token === "string" ? router.query.token : "";

  return <ChangePasswordForm token={token} />;
};

export default withAuth(ChangePasswordPage, false);
