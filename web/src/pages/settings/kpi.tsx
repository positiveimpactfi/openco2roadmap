import { withAuth } from "components/Auth";
import SettingsPanel from "components/SettingsPanel";
import useTranslation from "next-translate/useTranslation";

const KPISettingsPage = () => {
  const { t } = useTranslation("settings");
  return (
    <SettingsPanel
      title={t("pages.kpis.title")}
      description={t("pages.kpis.description_long")}
    >
      <div>KPI page</div>
    </SettingsPanel>
  );
};

export default withAuth(KPISettingsPage);
