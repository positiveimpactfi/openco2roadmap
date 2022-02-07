import { Listbox, Transition } from "@headlessui/react";
import { SelectorIcon, CheckIcon } from "@heroicons/react/solid";
import React, {
  Fragment,
  SelectHTMLAttributes,
  useEffect,
  useState,
} from "react";
import { classNames } from "utils/classNames";

interface SelectOption {
  id: number | string;
  name: string;
  children?: SelectOption[];
}

interface Props {
  options: SelectOption[];
  showLabel?: boolean;
  label?: string;
  name: string;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  selectedValue?: SelectOption;
  levels?: "two" | "three";
}

export type SelectProps = Props & SelectHTMLAttributes<HTMLSelectElement>;

const MultiLevelSelect: React.FC<SelectProps> = ({
  options,
  showLabel,
  label,
  name,
  setFieldValue,
  selectedValue,
  levels = "two",
}) => {
  const [selected, setSelected] = useState(() => selectedValue ?? null);

  useEffect(() => {
    if (selectedValue) {
      setSelected(selectedValue);
    }
  }, [selectedValue, setSelected]);

  const handleChange = (val) => {
    setSelected(val);
    setFieldValue(name, val);
  };

  return (
    <Listbox value={selected} onChange={handleChange}>
      {({ open }) => (
        <React.Fragment key="multilevelSelect">
          {showLabel && (
            <Listbox.Label className="block text-sm font-medium text-gray-700">
              {label}
            </Listbox.Label>
          )}
          <div className="relative mt-2">
            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 sm:text-sm">
              <span className="block truncate">
                {selected ? selected.name : "Valitse..."}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            {levels === "two" ? (
              <TwoLevelSelect options={options} open={open} />
            ) : (
              <ThreeLevelSelect options={options} open={open} />
            )}
          </div>
        </React.Fragment>
      )}
    </Listbox>
  );
};

const TwoLevelSelect: React.FC<{ options: SelectOption[]; open: boolean }> = ({
  options,
  open,
}) => {
  return (
    <Transition
      show={open}
      as={Fragment}
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Listbox.Options className="absolute z-10 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
        {options?.map((levelOne) => (
          <React.Fragment key={`levelOne-${levelOne.id}`}>
            <span
              className={classNames(
                "font-normal",
                "block truncate",
                "text-gray-900",
                "relative cursor-default select-none py-2 pl-3 pr-9"
              )}
            >
              {levelOne.name}
            </span>

            {levelOne.children.map((levelTwo) => (
              <Listbox.Option
                key={`l3-${levelTwo.id}`}
                className={({ active }) =>
                  classNames(
                    active
                      ? "rounded-md bg-teal-600 text-white"
                      : "text-gray-900",
                    "relative cursor-default select-none py-2 pl-3 pr-9"
                  )
                }
                value={levelTwo}
              >
                {({ selected, active }) => (
                  <>
                    {selected ? (
                      <span
                        className={classNames(
                          active ? "text-white" : "text-teal-600",
                          "absolute inset-y-0 left-1 mr-4 flex items-center"
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                    <span
                      className={classNames(
                        "ml-8",
                        "font-normal",
                        "block truncate"
                      )}
                    >
                      {levelTwo.name}
                    </span>
                  </>
                )}
              </Listbox.Option>
            ))}
          </React.Fragment>
        ))}
      </Listbox.Options>
    </Transition>
  );
};

const ThreeLevelSelect: React.FC<{
  options: SelectOption[];
  open: boolean;
}> = ({ options, open }) => {
  return (
    <Transition
      show={open}
      as={Fragment}
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Listbox.Options className="absolute z-10 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
        {options?.map((levelOne) => (
          <React.Fragment key={`levelOne-${levelOne.id}`}>
            <span
              className={classNames(
                "font-normal",
                "block truncate",
                "text-gray-900",
                "relative cursor-default select-none py-2 pl-3 pr-9"
              )}
            >
              {levelOne.name}
            </span>

            {levelOne.children.map((levelTwo) => (
              <React.Fragment key={`levelTwoFragment-${levelTwo.id}`}>
                <span
                  className={classNames(
                    "ml-4",
                    "font-normal",
                    "block truncate",
                    "text-gray-900",
                    "relative cursor-default select-none py-2 pl-3 pr-9"
                  )}
                >
                  {levelTwo.name}
                </span>
                {levelTwo.children.map((levelThree) => (
                  <Listbox.Option
                    key={`l3-${levelThree.id}`}
                    className={({ active }) =>
                      classNames(
                        active
                          ? "rounded-md bg-teal-600 text-white"
                          : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={levelThree}
                  >
                    {({ selected, active }) => (
                      <>
                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-teal-600",
                              "absolute inset-y-0 left-1 mr-4 flex items-center"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                        <span
                          className={classNames(
                            "ml-8",
                            "font-normal",
                            "block truncate"
                          )}
                        >
                          {levelThree.name}
                        </span>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </Listbox.Options>
    </Transition>
  );
};

export default MultiLevelSelect;
