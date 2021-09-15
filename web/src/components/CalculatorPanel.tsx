import { calculatorLinks } from "data/links/calculatorLinks";
import { useRouter } from "next/router";
import { Headings } from "./Admin/AdminPanel";
import TabMenu from "./TabMenu";

const CalculatorPanel: React.FC<Headings> = ({
  title,
  description,
  children,
}) => {
  return (
    <main className="flex-1 h-full relative z-0 overflow-y-auto focus:outline-none bg-gray-100">
      <div className="px-4 sm:px-6 lg:px-8 py-4 ">
        <CalculatorMenu />
      </div>
      <div className="px-4 mt-2 sm:px-6 lg:px-8 pb-10">
        <h1 className="text-2xl mb-4">{title}</h1>
        <p className="text-md mb-4">{description}</p>
        {children}
      </div>
    </main>
  );
};

const CalculatorMenu: React.FC = () => {
  const router = useRouter();
  const currentTab = {
    name: "Etusivu",
    href: "/calculator",
    current: router.pathname === "/calculator",
  };
  const links = [currentTab, ...calculatorLinks];

  return <TabMenu links={links} />;
};

export default CalculatorPanel;
