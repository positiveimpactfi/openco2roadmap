import LinksGrid from "components/LinksGrid";
import SettingsPanel from "components/SettingsPanel";
import { settingsLinks } from "data/settingsLinks";
import { NextPage } from "next";

const SettingsHomePage: NextPage = () => {
  return (
    <SettingsPanel
      title="Yritysasetukset"
      description="Yritysasetukset ja yrityskohtaiset päästökertoimet tällä sivulla. "
    >
      <div className="flex flex-col items-start">
        <LinksGrid links={settingsLinks} />
      </div>
    </SettingsPanel>
  );
};

export default SettingsHomePage;
