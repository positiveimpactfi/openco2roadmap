import setLanguage from "next-translate/setLanguage";
import { useRouter } from "next/router";

export default function ChangeLanguage() {
  const { locale } = useRouter();
  return (
    <span className="relative z-0 inline-flex shadow-sm rounded-md w-full">
      <button
        type="button"
        className="relative inline-flex items-left px-4 py-2 rounded-l-md bg-white text-sm text-gray-700 hover:bg-gray-50 w-full"
        onClick={async () => await setLanguage(locale === "fi" ? "en" : "fi")}
      >
        <span className="sr-only">{locale === "fi" ? "English" : "Suomi"}</span>
        {locale === "fi" ? "In English" : "Suomeksi"}
      </button>
    </span>
  );
}
