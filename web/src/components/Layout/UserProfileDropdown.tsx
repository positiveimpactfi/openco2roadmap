import { Menu, Transition } from "@headlessui/react";
import useLogout from "hooks/useLogout";
import Image from "next/image";
import { Fragment } from "react";
import logoImg from "../../../public/logo.svg";
import Link from "next/link";
import { classNames } from "../../utils/classNames";
import ChangeLanguage from "components/ChangeLanguage";
import useTranslation from "next-translate/useTranslation";

interface MenuItem {
  href: string;
  name: string;
}

const menuItems: MenuItem[] = [
  {
    href: "/profile",
    name: "profile",
  },
  {
    href: "/settings",
    name: "settings",
  },
  {
    href: "/notifications",
    name: "notifications",
  },
];

export const UserProfileDropdown = () => {
  const { t } = useTranslation("common");
  const [logout] = useLogout();
  return (
    <div className="flex items-center">
      <Menu as="div" className="ml-3 relative">
        {({ open }) => (
          <>
            <div>
              <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                <span className="sr-only">Avaa menu</span>
                <div className="h-8 w-8 rounded-full">
                  <Image src={logoImg} alt="Positive Impact Logo" />
                </div>
              </Menu.Button>
            </div>
            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                static
                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none z-10"
              >
                <div className="py-1">
                  {menuItems.map((menuItem, i) => (
                    <MenuItem
                      key={`menuItem-${i}`}
                      href={menuItem.href}
                      name={t(`user_menu.${menuItem.name}`)}
                    />
                  ))}
                </div>
                <div className="py-1 flex justify-start">
                  <Menu.Item>
                    <ChangeLanguage />
                  </Menu.Item>
                </div>
                {/* <div className="py-1">
                  <MenuItem href="/help" name={t("user_menu.support")} />
                </div> */}
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={async () => await logout()}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm w-full text-left"
                        )}
                      >
                        {t("user_menu.logout")}
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );
};

const MenuItem: React.FC<MenuItem> = ({ href, name }) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <Link href={href} passHref>
          <a
            className={classNames(
              active ? "bg-gray-100 text-gray-900" : "text-gray-700",
              "block px-4 py-2 text-sm"
            )}
          >
            {name}
          </a>
        </Link>
      )}
    </Menu.Item>
  );
};
