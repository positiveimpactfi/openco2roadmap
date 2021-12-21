import { calculatorLinks } from "data/links/calculatorLinks";
import { useRouter } from "next/router";
import { Headings } from "types/Headings";
import PageWithTabs from "./Layout/PageWithTabs";

const CalculatorPanel: React.FC<Headings> = ({
  title,
  description,
  children,
}) => {
  const router = useRouter();
  const currentTab = {
    name: "home",
    description: "Laskuri - Esusivu",
    href: "/calculator",
    current: router.pathname === "/calculator",
  };
  const links = [currentTab, ...calculatorLinks];
  return (
    <PageWithTabs
      title={title}
      description={description}
      links={links}
      namespace="calculator"
    >
      {children}
    </PageWithTabs>
  );
};

export default CalculatorPanel;
