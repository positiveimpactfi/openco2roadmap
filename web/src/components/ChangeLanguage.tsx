import setLanguage from "next-translate/setLanguage";
import { useRouter } from "next/router";

export default function ChangeLanguage() {
  const { locale } = useRouter();
  return (
    <span className="relative z-0 inline-flex w-full rounded-md shadow-sm">
      <button
        type="button"
        className="items-left relative inline-flex w-full rounded-l-md bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
        onClick={async () => await setLanguage(locale === "fi" ? "en" : "fi")}
      >
        <span className="sr-only">{locale === "fi" ? "English" : "Suomi"}</span>
        {locale === "fi" ? "In English" : "Suomeksi"}
      </button>
    </span>
  );
}
