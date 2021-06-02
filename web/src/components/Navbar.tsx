import { useMeQuery } from "generated/graphql";
import Link from "next/link";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const { data, loading } = useMeQuery();
  return (
    <>
      <div className="flex flex-row justify-between w-full p-4">
        <div>{data?.me?.email ?? "Not logged in"}</div>
        <div className="flex flex-row gap-2 ml-auto">
          <Link href="/login" passHref>
            <a>Login</a>
          </Link>
          <Link href="/register" passHref>
            <a>Register</a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
