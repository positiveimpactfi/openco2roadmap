import setLanguage from "next-translate/setLanguage";

export default function ChangeLanguage() {
  return (
    <span className="relative z-0 inline-flex shadow-sm rounded-md">
      <button
        type="button"
        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
        onClick={async () => await setLanguage("en")}
      >
        <span className="sr-only">English</span>
        🇺🇸
      </button>
      <button
        type="button"
        className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
        onClick={async () => await setLanguage("fi")}
      >
        <span className="sr-only">Suomi</span>
        🇫🇮
      </button>
    </span>
  );
}
