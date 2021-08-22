import { useMeQuery } from "generated/graphql";
import Image from "next/image";
import { isAdmin } from "utils/isAdmin";
import AdminPanel from "views/AdminPanel";
import logo from "../../../public/logo.svg";
import { Headings } from "./Overview";

const AdminsOnly: React.FC<Headings> = ({ title, description, children }) => {
  const { data, loading } = useMeQuery();

  const user = data?.me;
  if (loading) {
    return (
      <div className="flex flex-col w-96">
        <div className="animate-spin mb-6">
          <Image src={logo} alt="loading image" />
        </div>
        <div>Ladataan..</div>
      </div>
    );
  }

  if (isAdmin(user)) {
    return (
      <AdminPanel title={title} description={description}>
        {children}
      </AdminPanel>
    );
  } else {
    return <div>Pääsy estetty</div>;
  }
};

export default AdminsOnly;
