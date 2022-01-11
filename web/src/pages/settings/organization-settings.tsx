import { withAuth } from "components/Auth";
import ClientOnly from "components/ClientsOnly";
import EditOrganizationForm from "components/Forms/Organization/EditOrganizationForm";
import SettingsPanel from "components/SettingsPanel";
import { SectionUnderConstruction } from "components/UnderConstruction";
import { useUser } from "hooks/useUser";
import { NextPage } from "next";
import { Translate } from "next-translate";
import useTranslation from "next-translate/useTranslation";

const OrganizationSettingsPage: NextPage = () => {
  const { t } = useTranslation("settings");
  return (
    <SettingsPanel
      title={t("pages.org_settings.title")}
      description={t("pages.org_settings.description_long")}
    >
      <ClientOnly>
        <CompanyInfo t={t} />
      </ClientOnly>
      <ClientOnly>
        <CompanyKPIs t={t} />
      </ClientOnly>
    </SettingsPanel>
  );
};

const CompanyInfo: React.FC<{ t: Translate }> = ({ t }) => {
  const { user } = useUser();

  if (!user) return null;
  const org = user?.organizations[0];

  return (
    <div className="mt-10">
      <h2 className="text-xl">{t("pages.org_settings.company_info.title")}</h2>
      <p className="text-sm text-gray-500 mb-4">
        {t("pages.org_settings.company_info.description")}
      </p>
      <div className="max-w-2xl">
        <EditOrganizationForm org={org} />
      </div>
    </div>
  );
};

const CompanyKPIs: React.FC<{ t: Translate }> = ({ t }) => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="mt-4">
      <h2 className="text-xl">{t("pages.org_settings.kpis.title")}</h2>
      <p className="text-sm text-gray-500 mb-4">
        {t("pages.org_settings.kpis.description")}
      </p>
      <div className="max-w-2xl">
        <SectionUnderConstruction />
      </div>
    </div>
  );
};

export default withAuth(OrganizationSettingsPage);
