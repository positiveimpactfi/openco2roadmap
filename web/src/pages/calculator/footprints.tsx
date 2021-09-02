import CalculatorPanel from "components/CalculatorPanel";
import { PageUnderConstruction } from "components/UnderConstruction";

const CalculatorFootprintsPage = () => {
  return (
    <CalculatorPanel
      title="Hiilijalanjäljet"
      description="Tällä sivulla voit tarkastella yrityksesi päästötietojen yhteenvetoja ja hiilijalanjälkilaskelmia. Luvut on ilmoitettu tonneina CO2e. Luvut on merkitty kursiivilla, mikäli kyseiselle vuodelle ei ole ilmoitettu ko. rivin kulutustietoja. "
    >
      <div className="flex justify-center items-center h-full">
        <PageUnderConstruction />
      </div>
    </CalculatorPanel>
  );
};

export default CalculatorFootprintsPage;
