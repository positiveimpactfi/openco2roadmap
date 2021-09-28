/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import { classNames } from "utils/classNames";

const OptionsMenu: React.FC<{
  onShow: () => void;
  onDelete: () => void;
  variant?: "normal" | "last-element";
}> = ({ onShow, onDelete, variant = "normal" }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="bg-white rounded-full flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-teal-500">
          <span className="sr-only">Avaa toiminnot</span>
          <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={classNames(
            "origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20",
            variant === "last-element" ? "bottom-0 mb-7" : null
          )}
        >
          <div className="py-1">
            <Menu.Item>
              {() => (
                <button
                  onClick={onShow}
                  className={classNames(
                    "w-full text-left text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                  )}
                >
                  Näytä
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {() => (
                <button
                  onClick={onDelete}
                  className={classNames(
                    "w-full text-left text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                  )}
                >
                  Poista
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default OptionsMenu;
