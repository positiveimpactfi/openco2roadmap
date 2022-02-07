import { PageLink } from "types/PageLink";
import { classNames } from "utils/classNames";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";

const LinksGrid: React.FC<{ links: PageLink[]; namespace?: string }> = ({
  links,
  namespace = "common",
}) => {
  const { t } = useTranslation(namespace);
  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-4xl bg-white px-4 py-16 sm:px-6 sm:pt-20 sm:pb-24 lg:max-w-7xl lg:px-8 lg:pt-12">
        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-2 ">
          {links.map((link) => (
            <div key={link.name}>
              <div className="group flex flex-row">
                <Link href={link.href} passHref>
                  <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md bg-teal-500 group-hover:bg-teal-600">
                    <link.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
                <div className="ml-4 flex flex-col">
                  <h3
                    className={classNames(
                      link.disabled ? "text-gray-300" : "text-black",
                      "text-lg font-medium leading-none group-hover:text-gray-600"
                    )}
                  >
                    <Link href={link.href} passHref>
                      {t(`pages.${link.name}.title`)}
                    </Link>
                  </h3>
                  <p
                    className={classNames(
                      link.disabled ? "text-gray-200" : "text-gray-500",
                      "mt-2 text-base"
                    )}
                  >
                    {t(`pages.${link.name}.description`)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LinksGrid;
