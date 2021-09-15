import { withAuth } from "components/Auth";
import ClientOnly from "components/ClientsOnly";
import EditOrganizationForm from "components/Forms/Organization/EditOrganizationForm";
import SettingsPanel from "components/SettingsPanel";
import { SectionUnderConstruction } from "components/UnderConstruction";
import { useUser } from "hooks/useUser";
import { NextPage } from "next";

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

export default withAuth(OrganizationSettingsPage);
