import { BanIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";

export const AccessDenied = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center space-x-4 py-6 px-6 pb-8">
      <div className="w-24 font-extralight text-gray-600">
        <BanIcon />
      </div>
      <div className="flex max-w-[35ch] flex-col space-y-4">
        <h3 className="text-lg  text-gray-600">Ei pääsyoikeutta!</h3>
        <p className="text-gray-600">
          Siirry etusivulle{" "}
          <span>
            <Link href="/" passHref>
              <a className="text-teal-600">tästä</a>
            </Link>
          </span>{" "}
          tai palaa{" "}
          <button className="text-teal-600" onClick={() => router.back()}>
            edelliselle sivulle.
          </button>
        </p>
      </div>
    </div>
  );
};
