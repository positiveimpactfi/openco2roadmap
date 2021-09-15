import { PageLink } from "data/links/adminLinks";
import { classNames } from "utils/classNames";
import Link from "next/link";

const LinksGrid: React.FC<{ links: PageLink[] }> = ({ links }) => {
  return (
    <div className="bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 sm:pt-20 sm:pb-24 lg:max-w-7xl lg:pt-12 lg:px-8 bg-white">
        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-2 ">
          {links.map((link) => (
            <div key={link.name}>
              <div className="flex flex-row group">
                <Link href={link.href} passHref>
                  <span className="flex flex-shrink-0 items-center justify-center h-12 w-12 rounded-md bg-teal-500 group-hover:bg-teal-600">
                    <link.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
                <div className="flex flex-col ml-4">
                  <h3
                    className={classNames(
                      link.disabled ? "text-gray-300" : "text-black",
                      "text-lg font-medium leading-none group-hover:text-gray-600"
                    )}
                  >
                    <Link href={link.href} passHref>
                      {link.name}
                    </Link>
                  </h3>
                  <p
                    className={classNames(
                      link.disabled ? "text-gray-200" : "text-gray-500",
                      "mt-2 text-base"
                    )}
                  >
                    {link.description}
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
