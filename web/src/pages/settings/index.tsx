import { withAuth } from "components/Auth";
import LinksGrid from "components/LinksGrid";
import SettingsPanel from "components/SettingsPanel";
import { settingsLinks } from "data/links/settingsLinks";
import { NextPage } from "next";

const SettingsHomePage: NextPage = () => {
  return (
    <SettingsPanel
      title="Asetukset"
      description="Asetukset-osiossa pääset muokkaamaan yrityksesi hiilijalanjälkilaskentaan tarvittavia tietoja."
    >
      <div className="flex flex-col items-start">
        <LinksGrid links={settingsLinks} />
      </div>
    </SettingsPanel>
  );
};

export default withAuth(SettingsHomePage);
