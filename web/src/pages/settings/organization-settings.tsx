import ClientOnly from "components/ClientsOnly";
import EditOrganizationForm from "components/Forms/Organization/EditOrganizationForm";
import SettingsPanel from "components/SettingsPanel";
import { SectionUnderConstruction } from "components/UnderConstruction";
import { useUser } from "hooks/useUser";
import { NextPage } from "next";
import Link from "next/link";

const OrganizationSettingsPage: NextPage = () => {
  return (
    <SettingsPanel
      title="Yritysasetukset"
      description="Yritysasetukset ja yrityskohtaiset päästökertoimet tällä sivulla. "
    >
      <ClientOnly>
        <CompanyInfo />
      </ClientOnly>
      <ClientOnly>
        <CompanyKPIs />
      </ClientOnly>
      <CompanyEFs />
    </SettingsPanel>
  );
};

const CompanyInfo = () => {
  const { user } = useUser();

  if (!user) return null;
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
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="mt-4">
      <h2 className="text-xl">Tunnusluvut</h2>
      <p className="text-sm text-gray-500 mb-4">
        Täytä yrityksen tiedot viimeisimmän tilikauden mukaan.
      </p>
      <div className="max-w-2xl">
        <SectionUnderConstruction />
      </div>
    </div>
  );
};

const CompanyEFs = () => {
  const { user } = useUser();
  if (!user) return null;
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

export default OrganizationSettingsPage;
