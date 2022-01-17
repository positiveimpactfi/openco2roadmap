import Announcements from "components/Announcements/Announcements";
import { withAuth } from "components/Auth";
import { useRouter } from "next/router";

const Notifications = () => {
  const { locale } = useRouter();
  return (
    <>
      <h1 className="font-bold text-gray-700 text-2xl mb-2">
        {locale === "fi" ? "Kaikki ilmoitukset" : "All announcements"}
      </h1>
      <Announcements />
    </>
  );
};

export default withAuth(Notifications);
