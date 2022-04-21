/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import { classNames } from "utils/classNames";

const OptionsMenu: React.FC<{
  onShow?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  variant?: "normal" | "last-element" | "second-to-last";
  onShowText?: string;
  onEditText?: string;
  onDeleteText?: string;
}> = ({
  onShow,
  onEdit,
  onDelete,
  variant = "normal",
  onShowText = "Näytä",
  onEditText = "Muokkaa",
  onDeleteText = "Poista",
}) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex items-center rounded-full bg-white text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-100">
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
            "absolute right-0 z-20 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
            variant === "last-element" || variant === "second-to-last"
              ? "bottom-0 mb-7"
              : null
          )}
        >
          <div className="py-1">
            {onShow && (
              <Menu.Item>
                {() => (
                  <button
                    onClick={onShow}
                    className={classNames(
                      "block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    {onShowText}
                  </button>
                )}
              </Menu.Item>
            )}
            {onEdit && (
              <Menu.Item>
                {() => (
                  <button
                    onClick={onEdit}
                    className={classNames(
                      "block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    {onEditText}
                  </button>
                )}
              </Menu.Item>
            )}
            {onDelete && (
              <Menu.Item>
                {() => (
                  <button
                    onClick={onDelete}
                    className={classNames(
                      "block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    {onDeleteText}
                  </button>
                )}
              </Menu.Item>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default OptionsMenu;
