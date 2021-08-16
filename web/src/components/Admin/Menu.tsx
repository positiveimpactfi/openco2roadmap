import { classNames } from "utils/classNames";
import { adminLinks } from "data/adminLinks";
import { useRouter } from "next/router";
import { AdminLink } from "data/adminLinks";

const Menu = () => {
  const router = useRouter();
  const linksWithCurrent = adminLinks.map((link) => {
    return { ...link, current: router.pathname.includes(link.href) };
  });
  const currentTab: Partial<AdminLink & { current: boolean }> = {
    name: "Hallintapaneeli",
    href: "/",
    current: router.pathname.includes("/"),
  };
  const tabs = [currentTab, ...linksWithCurrent];

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
          defaultValue={tabs.find((tab) => tab.current)?.name}
        >
          {adminLinks.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav
            className="-mb-px flex space-x-8 overflow-x-auto"
            aria-label="Tabs"
          >
            {tabs.map((tab) => (
              <a
                key={tab.name}
                href={tab.href}
                className={classNames(
                  tab.current
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                  "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                {tab.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Menu;
