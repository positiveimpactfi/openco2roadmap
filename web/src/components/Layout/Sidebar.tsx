import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { sidebarLinks } from "data/links/sidebarLinks";
import useTranslation from "next-translate/useTranslation";
import NextImage from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Dispatch, Fragment, SetStateAction } from "react";
import { classNames } from "utils/classNames";
import EUlogo from "../../../public/EU_flag.svg";
import logoImg from "../../../public/logo.svg";
import VipuVoimaaImg from "../../../public/vipuvoimaaEU.svg";

export interface SidebarProps {
  sidebarOpen?: boolean;
  setSidebarOpen?: Dispatch<SetStateAction<boolean>>;
  hidden?: boolean;
}

export const MobileSideBar: React.FC<SidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  hidden = false,
}) => {
  const { t } = useTranslation("common");
  const { pathname } = useRouter();
  const currentPath = "/" + pathname.split("/")[1];
  if (hidden) return null;
  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed inset-0 z-40 flex xl:hidden"
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
          <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
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
                  className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="sr-only">Sulje sivupalkki</span>
                  <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </Transition.Child>
            <div className="flex flex-shrink-0 items-center space-x-3 px-4">
              <div className="relative h-8 w-8">
                <NextImage
                  src="/logo.svg"
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>
              <div>Open CO2 roadmap</div>
            </div>
            <div className="mt-5 h-0 flex-1 overflow-y-auto">
              <nav className="px-2">
                <div className="space-y-1">
                  {sidebarLinks?.map((item) => (
                    <Link href={item.href} passHref key={item.name}>
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.href === currentPath
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                          "group flex items-center rounded-md px-2 py-2 text-base font-medium leading-5"
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
                            "mr-3 h-6 w-6 flex-shrink-0"
                          )}
                          aria-hidden="true"
                        />
                        {t(`pages.${item.name}.title`)}
                      </a>
                    </Link>
                  ))}
                </div>
              </nav>
            </div>
          </div>
        </Transition.Child>
        <div className="w-14 flex-shrink-0" aria-hidden="true">
          {/* Dummy element to force sidebar to shrink to fit close icon */}
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export const DesktopSidebar: React.FC<{ hidden?: boolean }> = ({
  hidden = false,
}) => {
  const { t } = useTranslation("common");
  const { pathname } = useRouter();
  const currentPath = "/" + pathname.split("/")[1];
  if (hidden) return null;
  return (
    <div className="hidden md:sticky md:top-0 md:h-screen lg:flex">
      <div className="flex w-28 flex-col">
        <div className="hidden min-h-screen w-28 overflow-y-auto bg-gray-700 md:block">
          <div className="flex h-full w-full flex-col items-center py-6">
            <div className="flex flex-shrink-0 items-center ">
              <div className="h-12 w-12 invert filter hover:animate-pulse">
                <NextImage src={logoImg} priority alt="Positive Impact Logo" />
              </div>
            </div>
            <div className="flex h-full w-full flex-col justify-between">
              <div className="mt-6 w-full flex-1 space-y-1 px-2">
                {sidebarLinks?.map((item) => (
                  <Link href={item.href} passHref key={item.name}>
                    <a
                      className={classNames(
                        item.href === currentPath
                          ? "bg-gray-800 text-green-400"
                          : "text-indigo-100 hover:bg-gray-800 hover:text-white",
                        "group flex w-full flex-col items-center rounded-md p-3 text-xs font-medium"
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
                      <span className="mt-2">
                        {t(`pages.${item.name}.title`)}
                      </span>
                    </a>
                  </Link>
                ))}
              </div>
              <div className="ml-auto flex w-28 flex-col">
                <div className="flex w-28 flex-col items-center text-justify">
                  <div className="w-20 ">
                    <NextImage src={EUlogo} alt="EU lippu" priority />
                  </div>
                  <div className="text-center text-white">
                    <p className="text-xs">Euroopan unioni</p>
                    <p className="text-[0.4rem] leading-[0.5rem]">
                      Euroopan aluekehitysrahasto
                    </p>
                  </div>
                </div>
                <div className="ml-auto mt-4 w-24 invert">
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
