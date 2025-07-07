import { useDisclosure } from "@/hooks";

import { Bars3Icon } from "@heroicons/react/24/outline";
import { Header } from "./header";
import { Outlet } from "react-router";
import { Sidebar } from "./sidebar/sidebar";

export const MainLayout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div>
        {/* Static sidebar for desktop */}
        <Sidebar isOpen={isOpen} onClose={onClose} />

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 lg:mx-auto lg:max-w-7xl lg:px-8">
            <div className="flex h-16 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-xs sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none">
              <button
                type="button"
                onClick={onOpen}
                className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>

              {/* Separator */}
              <div
                aria-hidden="true"
                className="h-6 w-px bg-gray-200 lg:hidden"
              />

              <Header />
            </div>
          </div>

          <main className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
