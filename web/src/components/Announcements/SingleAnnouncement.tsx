import { Announcement } from "types/Annoucement";
import Image from "next/image";
import { useRouter } from "next/router";
import logo from "../../../public/logo.svg";

const SingleAnnouncement: React.FC<{ announcement: Announcement }> = ({
  announcement,
}) => {
  const { locale } = useRouter();
  const localization = announcement.localizations.filter(
    (l) => l.locale === locale
  )[0];
  return (
    <div className="bg-white px-4 py-5 sm:px-6 rounded-lg">
      <div className="flex space-x-3">
        <div className="flex-shrink-0">
          <Image
            className="rounded-full"
            src={logo}
            height={40}
            width={40}
            alt=""
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-900">
            {announcement.createdBy.name}
          </p>
          <p className="text-sm text-gray-500">
            {new Date(announcement.updatedAt).toLocaleString()}
          </p>
        </div>
      </div>
      <div className="mt-2">
        <h2 className="font-medium text-gray-700 text-lg">
          {localization.title}
        </h2>
        <div
          dangerouslySetInnerHTML={{ __html: localization.description.html }}
        />
      </div>
    </div>
  );
};

export default SingleAnnouncement;
