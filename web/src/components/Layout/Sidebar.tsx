import { Dialog, Transition } from "@headlessui/react";
import {
  CalculatorIcon,
  CogIcon,
  HomeIcon,
  ServerIcon,
  XIcon,
} from "@heroicons/react/outline";
import NextImage from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Dispatch, Fragment, SetStateAction } from "react";
import { classNames } from "utils/classNames";
import logoImg from "../../../public/logo.svg";
import EUlogo from "../../../public/EU_flag.svg";
import VipuVoimaaImg from "../../../public/vipuvoimaaEU.svg";

const sidebarNavigation = [
  { name: "Etusivu", href: "/", icon: HomeIcon, current: false },
  {
    name: "Laskuri",
    href: "/calculator",
    icon: CalculatorIcon,
    current: false,
  },
  { name: "Asetukset", href: "/settings", icon: CogIcon, current: false },
  { name: "Hallintapaneeli", href: "/admin", icon: ServerIcon, current: true },
];

export interface SidebarProps {
  sidebarOpen?: boolean;
  setSidebarOpen?: Dispatch<SetStateAction<boolean>>;
}

export const MobileSideBar: React.FC<SidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
}) => {
  const { pathname } = useRouter();
  const currentPath = "/" + pathname.split("/")[1];
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
                  <span className="sr-only">Sulje sivupalkki</span>
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
                  {sidebarNavigation.map((item) => (
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

export const DesktopSidebar: React.FC<{}> = () => {
  const { pathname } = useRouter();
  const currentPath = "/" + pathname.split("/")[1];
  return (
    <div className="hidden md:flex md:sticky md:h-screen md:top-0">
      <div className="flex flex-col w-28">
        <div className="min-h-screen hidden w-28 bg-gray-700 overflow-y-auto md:block">
          <div className="w-full h-full py-6 flex flex-col items-center">
            <div className="flex-shrink-0 flex items-center ">
              <div className="h-12 w-12 filter invert hover:animate-pulse">
                <NextImage src={logoImg} priority alt="Positive Impact Logo" />
              </div>
            </div>
            <div className="flex flex-col justify-between h-full w-full">
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
                    aria-current={
                      item.href === currentPath ? "page" : undefined
                    }
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
              <div className="flex flex-col w-28 ml-auto">
                <div className="flex flex-col w-28 items-center text-justify">
                  <div className="w-20 ">
                    <NextImage src={EUlogo} alt="EU lippu" priority />
                  </div>
                  <div className="text-white text-center">
                    <p className="text-xs">Euroopan unioni</p>
                    <p className="text-[0.4rem] leading-[0.5rem]">
                      Euroopan aluekehitysrahasto
                    </p>
                  </div>
                </div>
                <div className="ml-auto invert w-24 mt-4">
                  <div className="w-20">
                    <NextImage
                      src={VipuVoimaaImg}
                      alt="Vipuvoimaa EU"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
