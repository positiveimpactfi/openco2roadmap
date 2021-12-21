import { withAuth } from "components/Auth";
import LinksGrid from "components/LinksGrid";
import SettingsPanel from "components/SettingsPanel";
import { settingsLinks } from "data/links/settingsLinks";
import { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";

const SettingsHomePage: NextPage = () => {
  const { t } = useTranslation("settings");
  return (
    <SettingsPanel
      title={t("pages.home.title")}
      description={t("pages.home.description")}
    >
      <div className="flex flex-col items-start">
        <LinksGrid links={settingsLinks} namespace="settings" />
      </div>
    </SettingsPanel>
  );
};

export default withAuth(SettingsHomePage);
