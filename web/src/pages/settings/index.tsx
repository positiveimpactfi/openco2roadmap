import EditOrganizationForm from "components/Forms/Organization/EditOrganizationForm";
import LoadingSpinner from "components/LoadingSpinner";
import TabMenu from "components/TabMenu";
import { settingsLinks } from "data/settingsLinks";
import { Organization, User } from "generated/graphql";
import { useUser } from "hooks/useUser";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";

const MySettingsPage: NextPage = () => {
  return (
    <main className="flex-1 h-full relative z-0 overflow-y-auto focus:outline-none bg-gray-100">
      <div className="px-4 sm:px-6 lg:px-8 py-4 ">
        <SettingsMenu />
      </div>
      <div className="px-4 mt-2 sm:px-6 lg:px-8">
        <h1 className="text-2xl mb-4">Yritysasetukset </h1>
        <p className="text-md mb-4">
          Yritysasetukset ja yrityskohtaiset päästökertoimet tällä sivulla.
        </p>
        <CompanyInfo />
        <CompanyKPIs />
        <CompanyEFs />
      </div>
    </main>
  );
};

const SettingsMenu: React.FC = () => {
  const router = useRouter();
  const currentTab = {
    name: "Etusivu",
    href: "/settings",
    current: router.pathname === "/settings",
  };
  const links = [currentTab, ...settingsLinks];

  return <TabMenu links={links} />;
};

const CompanyInfo = () => {
  const { user, loading } = useUser();

  if (loading) return <LoadingSpinner />;
  if (!user) return <div>No user!!</div>;
  const org = user?.organizations[0];

  return (
    <div className="mt-10">
      <h2 className="text-xl">Yrityksen tiedot</h2>
      <p className="text-sm text-gray-500 mb-4">
        Täytä yrityksen tiedot viimeisimmän tilikauden mukaan.
      </p>
      <div className="max-w-2xl">
        <EditOrganizationForm org={org} />
      </div>
    </div>
  );
};

const CompanyKPIs = () => {
  const { user, loading } = useUser();

  if (loading) return <LoadingSpinner />;
  if (!user) return <div>No user!</div>;
  const org = user?.organizations[0];

  return (
    <div className="mt-4">
      <h2 className="text-xl">Tunnusluvut</h2>
      <p className="text-sm text-gray-500 mb-4">
        Täytä yrityksen tiedot viimeisimmän tilikauden mukaan.
      </p>
      <div className="max-w-2xl">
        {/* <EditOrganizationForm org={org} /> */}
      </div>
    </div>
  );
};

const CompanyEFs = () => {
  return (
    <div className="mt-4">
      <h2 className="text-xl">Omat päästökertoimet</h2>
      <p className="text-sm text-gray-500 mb-4">
        Voit lisätä omia päästökertoimia{" "}
        <span>
          <Link href="/settings/emission-factors" passHref>
            <a className="font-medium text-teal-600 hover:text-teal-500">
              tämän sivun kautta
            </a>
          </Link>
        </span>
        .
      </p>
    </div>
  );
};

export default MySettingsPage;
