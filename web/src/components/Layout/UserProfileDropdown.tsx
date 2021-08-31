import { Menu, Transition } from "@headlessui/react";
import useLogout from "hooks/useLogout";
import Image from "next/image";
import { Fragment } from "react";
import logoImg from "../../../public/logo.svg";
import { classNames } from "../../utils/classNames";

interface MenuItem {
  href: string;
  description: string;
}

const menuItems: MenuItem[] = [
  {
    href: "/profile",
    description: "Katso profiili",
  },
  {
    href: "/settings",
    description: "Asetukset",
  },
  {
    href: "/notifications",
    description: "Ilmoitukset",
  },
];

export const UserProfileDropdown = () => {
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
                      description={menuItem.description}
                    />
                  ))}
                </div>
                <div className="py-1">
                  <MenuItem href="/help" description="Tuki" />
                </div>
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
                        Kirjaudu ulos
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

const MenuItem: React.FC<MenuItem> = ({ href, description }) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <a
          href={href}
          className={classNames(
            active ? "bg-gray-100 text-gray-900" : "text-gray-700",
            "block px-4 py-2 text-sm"
          )}
        >
          {description}
        </a>
      )}
    </Menu.Item>
  );
};
