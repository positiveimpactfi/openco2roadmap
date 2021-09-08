import CalculatorPanel from "components/CalculatorPanel";
import LinksGrid from "components/LinksGrid";
import { calculatorLinks } from "data/calculatorLinks";

const CalculatorHomePage = () => {
  return (
    <CalculatorPanel>
      <div className="flex flex-col items-start">
        <LinksGrid links={calculatorLinks} />
      </div>
    </CalculatorPanel>
  );
};

export default CalculatorHomePage;
