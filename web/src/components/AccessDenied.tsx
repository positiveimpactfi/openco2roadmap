import { BanIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";

export const AccessDenied = () => {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center space-x-4 py-6 pb-8 px-6">
      <div className="w-24 text-gray-600 font-extralight">
        <BanIcon />
      </div>
      <div className="flex flex-col space-y-4 max-w-[35ch]">
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
            edelliselle sivulle
          </button>
          .
        </p>
      </div>
    </div>
  );
};
