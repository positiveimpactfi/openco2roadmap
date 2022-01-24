import { Disclosure, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { classNames } from "utils/classNames";

interface CollapsibleProps {
  title: string;
  defaultOpen?: boolean;
}

const Collapsible: React.FC<CollapsibleProps> = ({
  title,
  defaultOpen = false,
  children,
}) => {
  return (
    <Disclosure as="div" key={title} className="pt-6" defaultOpen={defaultOpen}>
      {({ open }) => (
        <>
          <dt className="text-lg">
            <Disclosure.Button className="text-left max-w-lg flex justify-between items-start text-gray-400">
              <span className="font-medium text-gray-900">{title}</span>
              <span className="ml-6 h-7 flex items-center">
                <ChevronDownIcon
                  className={classNames(
                    open ? "-rotate-180" : "rotate-0",
                    "h-6 w-6 transform"
                  )}
                  aria-hidden="true"
                />
              </span>
            </Disclosure.Button>
          </dt>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-90 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel
              as="dd"
              className="mt-2 pr-12"
              static={defaultOpen}
            >
              {children}
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

export default Collapsible;
