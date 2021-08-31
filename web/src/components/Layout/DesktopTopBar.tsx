import { UserProfileDropdown } from "./UserProfileDropdown";

export const DesktopTopBar = () => {
  return (
    <div className="lg:border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 bg-white">
      <div className="flex-1 min-w-0"></div>
      <div className="mt-4 flex sm:mt-0 sm:ml-4">
        <div className="hidden lg:flex">
          <UserProfileDropdown />
        </div>
      </div>
    </div>
  );
};
