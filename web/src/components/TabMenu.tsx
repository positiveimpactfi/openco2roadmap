import { PageLink } from "types/PageLink";
import { useRouter } from "next/router";
import { classNames } from "utils/classNames";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";

interface TabMenuProps {
  links: Partial<PageLink & { current?: boolean }>[];
  namespace?: string;
}

const TabMenu: React.FC<TabMenuProps> = ({ links, namespace = "common" }) => {
  const { t } = useTranslation(namespace);
  const router = useRouter();
  const tabs = links.map((link) => {
    return {
      ...link,
      current: link.current ?? router.pathname.startsWith(link.href),
    };
  });
  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Valitse sivu
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
          onChange={(e) => router.push(e.currentTarget.value)}
          value={tabs.find((tab) => tab.current)?.href}
        >
          {tabs.map((tab) => (
            <option
              key={tab.name}
              label={t(`pages.${tab.name}.title`)}
              value={tab.href}
            >
              {t(`pages.${tab.name}.title`)}
            </option>
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
              <Link href={tab.href} key={tab.name} passHref>
                <a
                  className={classNames(
                    tab.current
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                    "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium",
                    tab.disabled ? "text-opacity-50" : null
                  )}
                  aria-current={tab.current ? "page" : undefined}
                >
                  {t(`pages.${tab.name}.title`)}
                </a>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default TabMenu;
