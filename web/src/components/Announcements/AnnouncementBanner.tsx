import { XIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { Announcement } from "types/Annoucement";
import Link from "next/link";
import { useState } from "react";

const Banner: React.FC<{ announcement: Announcement }> = ({ announcement }) => {
  const { locale } = useRouter();
  const [visible, setVisible] = useState(true);
  if (!announcement) return null;

  const localization = announcement.localizations.filter(
    (l) => l.locale === locale
  )[0];

  const handleSetLatestAnnouncement = () => {
    localStorage.setItem("latestAnnouncement", announcement.id);
    setVisible(false);
  };

  return (
    <>
      {visible && (
        <div className="relative bg-teal-600">
          <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
            <div className="pr-16 sm:px-16 sm:text-center">
              <p className="font-medium text-white">
                <span>{localization.title}</span>
                <span className="block sm:ml-2 sm:inline-block">
                  <Link href="/notifications" passHref>
                    <a
                      className="font-bold text-white underline"
                      onClick={handleSetLatestAnnouncement}
                    >
                      {" "}
                      {locale === "fi" ? "Lue lisää" : "Read more"}{" "}
                      <span aria-hidden="true">&rarr;</span>
                    </a>
                  </Link>
                </span>
              </p>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-start pt-1 pr-1 sm:items-start sm:pt-1 sm:pr-2">
              <button
                type="button"
                className="flex rounded-md p-2 hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-white"
                onClick={handleSetLatestAnnouncement}
              >
                <span className="sr-only">
                  {locale === "fi" ? "Sulje" : "Dismiss"}
                </span>
                <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Banner;
