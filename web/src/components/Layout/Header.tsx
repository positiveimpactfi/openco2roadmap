import { MenuAlt2Icon } from "@heroicons/react/outline";
import React from "react";
import { UserProfileDropdown } from "./UserProfileDropdown";

export const Header = ({ setMobileMenuOpen }) => {
  return (
    <header className="w-full">
      <div className="relative z-2 flex-shrink-0 h-16 bg-white border-b border-gray-200 shadow-sm flex">
        <button
          type="button"
          className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:teal-indigo-500 lg:hidden"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="sr-only">Avaa sivupalkki</span>
          <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="flex-1 flex justify-between px-4 sm:px-6">
          <div className="flex-1 flex"></div>
          <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
            <UserProfileDropdown />
          </div>
        </div>
      </div>
    </header>
  );
};
