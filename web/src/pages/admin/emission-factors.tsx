import AdminsOnly from "components/Admin/AdminsOnly";
import { withAuth } from "components/Auth";

const AdminEmissionFactorsPage = () => {
  return (
    <AdminsOnly title="Päästökertoimet" description="">
      <div>ef</div>
    </AdminsOnly>
  );
};

export default withAuth(AdminEmissionFactorsPage);
