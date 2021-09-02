import CalculatorPanel from "components/CalculatorPanel";
import { PageUnderConstruction } from "components/UnderConstruction";

const CalculatorConsumptionDataPage = () => {
  return (
    <CalculatorPanel title="Kulutustiedot" description="">
      <div className="flex justify-center items-center h-full">
        <PageUnderConstruction />
      </div>
    </CalculatorPanel>
  );
};

export default CalculatorConsumptionDataPage;
