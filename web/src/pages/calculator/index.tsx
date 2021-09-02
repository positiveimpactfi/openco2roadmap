import CalculatorPanel from "components/CalculatorPanel";
import LinksGrid from "components/LinksGrid";
import { calculatorLinks } from "data/calculatorLinks";

const CalculatorHomePage = () => {
  return (
    <CalculatorPanel>
      <LinksGrid links={calculatorLinks} />
    </CalculatorPanel>
  );
};

export default CalculatorHomePage;
