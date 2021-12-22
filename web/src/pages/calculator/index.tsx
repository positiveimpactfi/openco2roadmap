import { withAuth } from "components/Auth";
import CalculatorPanel from "components/CalculatorPanel";
import LinksGrid from "components/LinksGrid";
import { calculatorLinks } from "data/links/calculatorLinks";

const CalculatorHomePage: React.FC = () => {
  return (
    <CalculatorPanel>
      <div className="flex flex-col items-start">
        <LinksGrid links={calculatorLinks} namespace="calculator" />
      </div>
    </CalculatorPanel>
  );
};

export default withAuth(CalculatorHomePage, true);
