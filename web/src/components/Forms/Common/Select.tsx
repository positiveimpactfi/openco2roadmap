import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { Fragment, SelectHTMLAttributes, useState } from "react";
import { classNames } from "utils/classNames";

interface SelectOption {
  id: number | string;
  name: string;
  isParent?: boolean;
}

interface Props {
  options: SelectOption[];
  showLabel?: boolean;
  label?: string;
  name: string;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  selectedValue?: SelectOption;
}

export type SelectProps = Props & SelectHTMLAttributes<HTMLSelectElement>;

const Select: React.FC<SelectProps> = ({
  options,
  showLabel,
  label,
  name,
  setFieldValue,
  selectedValue,
}) => {
  const [selected, setSelected] = useState(() =>
    !selectedValue
      ? null
      : options.filter((option) => option.name === selectedValue.name)[0]
  );
  const isTwoLevelSelect = options.some((option) => option.isParent);

  const handleChange = (val) => {
    setSelected(val);
    setFieldValue(name, val);
  };

  return (
    <Listbox value={selected} onChange={handleChange}>
      {({ open }) => (
        <>
          {showLabel && (
            <Listbox.Label className="block text-sm font-medium text-gray-700">
              {label}
            </Listbox.Label>
          )}
          <div className="mt-2 relative">
            <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 sm:text-sm">
              <span className="block truncate">
                {selected ? selected.name : "Valitse..."}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {options.map((option) => (
                  <Listbox.Option
                    key={option.id}
                    className={({ active }) =>
                      classNames(
                        active
                          ? "text-white bg-teal-600 rounded-md"
                          : "text-gray-900",
                        "cursor-default select-none relative py-2 pl-3 pr-9"
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-teal-600",
                              "absolute inset-y-0 left-1 flex items-center mr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate",
                            !isTwoLevelSelect ? "ml-4" : null,
                            isTwoLevelSelect && !option.isParent ? "ml-4" : null
                          )}
                        >
                          {option.name}
                        </span>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default Select;
