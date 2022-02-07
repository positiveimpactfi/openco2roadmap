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
      <Menu as="div" className="relative ml-3">
        {({ open }) => (
          <>
            <div>
              <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
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
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
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
                <div className="flex justify-start py-1">
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
                          "block w-full px-4 py-2 text-left text-sm"
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
              "block w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
            )}
          >
            {name}
          </a>
        </Link>
      )}
    </Menu.Item>
  );
};
