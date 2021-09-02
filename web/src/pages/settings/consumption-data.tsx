import SettingsPanel from "components/SettingsPanel";
import {
  PageUnderConstruction,
  SectionUnderConstruction,
} from "components/UnderConstruction";

const ConsumptionSettingsPage = () => {
  return (
    <SettingsPanel>
      <div className="flex justify-center items-center h-full">
        <PageUnderConstruction />
      </div>
    </SettingsPanel>
  );
};

export default ConsumptionSettingsPage;
