import { Dialog, Transition } from "@headlessui/react";
import {
  CloudUploadIcon,
  CogIcon,
  CollectionIcon,
  HomeIcon,
  UserGroupIcon,
  ViewGridIcon,
  XIcon,
} from "@heroicons/react/outline";
import { GlobeAltIcon, UsersIcon } from "@heroicons/react/solid";
import NextImage from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Dispatch, Fragment, SetStateAction } from "react";
import { classNames } from "utils/classNames";
import logoImg from "../../../public/logo.svg";

const navigation = [
  { name: "Home", href: "/admin", icon: HomeIcon },
  {
    name: "Organizations",
    href: "/admin/organizations",
    icon: GlobeAltIcon,
  },
  { name: "Users", href: "/admin/users", icon: UsersIcon },
];

const sidebarNavigation = [
  { name: "Etusivu", href: "/", icon: HomeIcon },
  { name: "Dashboard", href: "#", icon: ViewGridIcon },
  { name: "CO2-laskuri", href: "#", icon: CloudUploadIcon },
  { name: "Käyttäjät", href: "#", icon: UserGroupIcon },
  { name: "Data center", href: "#", icon: CollectionIcon },
  { name: "Asetukset", href: "#", icon: CogIcon },
];

const teams = [
  { name: "Roadmap", href: "#", bgColorClass: "bg-indigo-500" },
  { name: "Footprint", href: "#", bgColorClass: "bg-green-500" },
  { name: "Handprint", href: "#", bgColorClass: "bg-yellow-500" },
];

export interface AdminSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
}) => {
  const { pathname } = useRouter();

  return (
    <div className="h-screen flex overflow-hidden bg-white">
      <MobileSideBar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        currentPath={pathname}
      />
      <DesktopSidebar currentPath={pathname} />
    </div>
  );
};
type MobileSidebarProps = AdminSidebarProps & { currentPath: string };

const MobileSideBar: React.FC<MobileSidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  currentPath,
}) => {
  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed inset-0 flex z-40 lg:hidden"
        open={sidebarOpen}
        onClose={setSidebarOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 flex items-center px-4 space-x-3">
              <div className="h-8 w-8 relative">
                <NextImage
                  src="/logo.svg"
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>
              <div>Open CO2 roadmap</div>
            </div>
            <div className="mt-5 flex-1 h-0 overflow-y-auto">
              <nav className="px-2">
                <div className="space-y-1">
                  {navigation.map((item) => (
                    <Link href={item.href} passHref key={item.name}>
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.href === currentPath
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                          "group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md"
                        )}
                        aria-current={
                          item.href === currentPath ? "page" : undefined
                        }
                      >
                        <item.icon
                          className={classNames(
                            item.href === currentPath
                              ? "text-gray-500"
                              : "text-gray-400 group-hover:text-gray-500",
                            "mr-3 flex-shrink-0 h-6 w-6"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </div>
                <div className="mt-8">
                  <h3
                    className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                    id="teams-headline"
                  >
                    Tags
                  </h3>
                  <div
                    className="mt-1 space-y-1"
                    role="group"
                    aria-labelledby="teams-headline"
                  >
                    {teams.map((team) => (
                      <a
                        key={team.name}
                        href={team.href}
                        className="group flex items-center px-3 py-2 text-base leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                      >
                        <span
                          className={classNames(
                            team.bgColorClass,
                            "w-2.5 h-2.5 mr-4 rounded-full"
                          )}
                          aria-hidden="true"
                        />
                        <span className="truncate">{team.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </Transition.Child>
        <div className="flex-shrink-0 w-14" aria-hidden="true">
          {/* Dummy element to force sidebar to shrink to fit close icon */}
        </div>
      </Dialog>
    </Transition.Root>
  );
};

const DesktopSidebar: React.FC<{
  currentPath: string;
}> = ({ currentPath }) => {
  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden w-full">
      <div className="hidden w-28 bg-gray-700 overflow-y-auto md:block">
        <div className="w-full py-6 flex flex-col items-center">
          <div className="flex-shrink-0 flex items-center ">
            <div className="h-12 w-12 filter invert hover:animate-pulse">
              <NextImage src={logoImg} priority alt="Positive Impact Logo" />
            </div>
          </div>
          <div className="flex-1 mt-6 w-full px-2 space-y-1">
            {sidebarNavigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={classNames(
                  item.href === currentPath
                    ? "bg-gray-800 text-green-400"
                    : "text-indigo-100 hover:bg-gray-800 hover:text-white",
                  "group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium"
                )}
                aria-current={item.href === currentPath ? "page" : undefined}
              >
                <item.icon
                  className={classNames(
                    item.href === currentPath
                      ? "text-green-400"
                      : "text-white group-hover:text-white",
                    "h-6 w-6"
                  )}
                  aria-hidden="true"
                />
                <span className="mt-2">{item.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
