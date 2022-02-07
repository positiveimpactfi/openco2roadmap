import React, { useState } from "react";
import { Listbox, Transition } from "@headlessui/react";

const people = [
  "Wade Cooper",
  "Arlene Mccoy",
  "Devon Webb",
  "Tom Cook",
  "Tanya Fox",
  "Hellen Schmidt",
  "Caroline Schultz",
  "Mason Heaney",
  "Claudie Smitham",
  "Emil Schaefer",
];

const SelectMulti = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedPersons, setSelectedPersons] = useState([]);

  function isSelected(value) {
    return selectedPersons.find((el) => el === value) ? true : false;
  }

  function handleSelect(value) {
    if (!isSelected(value)) {
      const selectedPersonsUpdated = [
        ...selectedPersons,
        people.find((el) => el === value),
      ];
      setSelectedPersons(selectedPersonsUpdated);
    } else {
      handleDeselect(value);
    }
    setIsOpen(true);
  }

  function handleDeselect(value) {
    const selectedPersonsUpdated = selectedPersons.filter((el) => el !== value);
    setSelectedPersons(selectedPersonsUpdated);
    setIsOpen(true);
  }

  return (
    <div className="flex items-center justify-center p-12">
      <div className="mx-auto w-full max-w-xs">
        <Listbox
          // as="div"
          // className="space-y-1"
          value={selectedPersons}
          onChange={(value) => handleSelect(value)}
          // open={isOpen}
        >
          {({ open }) => (
            <>
              <Listbox.Label className="block text-sm font-medium leading-5 text-gray-700">
                Assigned to
              </Listbox.Label>
              <div className="relative">
                <span className="inline-block w-full rounded-md shadow-sm">
                  <Listbox.Button
                    className="focus:shadow-outline-blue relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left transition duration-150 ease-in-out focus:border-blue-300 focus:outline-none sm:text-sm sm:leading-5"
                    // onClick={() => setIsOpen(!isOpen)}
                  >
                    <span className="block truncate">
                      {selectedPersons.length < 1
                        ? "Select persons"
                        : `Selected persons (${selectedPersons.length})`}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </Listbox.Button>
                </span>

                <Transition
                  unmount={false}
                  // show={open}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  className="absolute mt-1 w-full rounded-md bg-white shadow-lg"
                >
                  <Listbox.Options
                    static
                    className="shadow-xs max-h-60 overflow-auto rounded-md py-1 text-base leading-6 focus:outline-none sm:text-sm sm:leading-5"
                  >
                    {people.map((person) => {
                      const selected = isSelected(person);
                      return (
                        <Listbox.Option
                          key={person}
                          value={person}
                          onClick={(v) => console.log("option clicked", v)}
                        >
                          {({ active }) => (
                            <div
                              className={`${
                                active
                                  ? "bg-blue-600 text-white"
                                  : "text-gray-900"
                              } relative cursor-default select-none py-2 pl-8 pr-4`}
                            >
                              <span
                                className={`${
                                  selected ? "font-semibold" : "font-normal"
                                } block truncate`}
                              >
                                {person}
                              </span>
                              {selected && (
                                <span
                                  className={`${
                                    active ? "text-white" : "text-blue-600"
                                  } absolute inset-y-0 left-0 flex items-center pl-1.5`}
                                >
                                  <svg
                                    className="h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </span>
                              )}
                            </div>
                          )}
                        </Listbox.Option>
                      );
                    })}
                  </Listbox.Options>
                </Transition>
                <div className="pt-1 text-sm">
                  {selectedPersons.length > 0 && (
                    <>Selected persons: {selectedPersons.join(", ")}</>
                  )}
                </div>
              </div>
            </>
          )}
        </Listbox>
      </div>
    </div>
  );
};

export default SelectMulti;
