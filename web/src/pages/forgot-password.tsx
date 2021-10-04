import { withAuth } from "components/Auth";
import ForgotPasswordForm from "components/Forms/Auth/ForgotPasswordForm";

const ForgotPasswordPage: React.FC = () => {
  return <ForgotPasswordForm />;
};

export default withAuth(ForgotPasswordPage, false);
