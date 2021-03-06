import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

const SparklesIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
      />
    </svg>
  );
};

const PageNotFound = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>404 | Matkailun CO2-laskuri</title>
      </Head>
      <div className="flex items-center justify-center space-x-4 py-6 px-6 pb-8">
        <div className="w-24 font-extralight text-gray-600">
          <SparklesIcon />
        </div>
        <div className="flex max-w-[35ch] flex-col space-y-4">
          <h3 className="text-lg  text-gray-600">Sivua ei löytynyt!</h3>
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
    </>
  );
};

export default PageNotFound;
