import Banner from "components/Announcements/AnnouncementBanner";
import { withAuth } from "components/Auth";
import LinksGrid from "components/LinksGrid";
import LoadingSpinner from "components/LoadingSpinner";
import { sidebarLinks } from "data/links/sidebarLinks";
import { useMeQuery } from "graphql/queries/users/me.generated";
import useTranslation from "next-translate/useTranslation";
import { Announcement } from "types/Annoucement";
import { User } from "types/generatedTypes";

const Home = () => {
  const { data, loading } = useMeQuery();
  const user = data?.me;
  if (loading) {
    return <LoadingSpinner />;
  }

  return <UserLoggedIn user={user} />;
};

const UserLoggedIn: React.FC<{ user: Partial<User> }> = ({ user }) => {
  const { t } = useTranslation("common");
  const announcements: Announcement[] = JSON.parse(
    localStorage.getItem("announcements")
  );
  const latestAnnouncement = localStorage.getItem("latestAnnouncement");

  return (
    <>
      {announcements.length > 0 &&
        (!latestAnnouncement || latestAnnouncement !== announcements[0].id) && (
          <Banner announcement={announcements[0]} />
        )}
      <div className="px-4 sm:px-6 lg:px-8 pb-4">
        <h2 className="text-xl mb-4">{`${t("home:greeting")}, ${
          user.firstName ?? user.email
        }`}</h2>
        <div className="flex flex-col items-start">
          <LinksGrid links={sidebarLinks} />
        </div>
      </div>
    </>
  );
};

export default withAuth(Home);
