import { BellIcon, UserIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export const Header = () => {
  return (
    <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
      <form action="#" method="GET" className="grid flex-1 grid-cols-1">
        <input
          name="search"
          type="search"
          placeholder="Search"
          autoComplete="off"
          aria-label="Search"
          className="col-start-1 row-start-1 block size-full border-0 bg-white pl-8 text-base text-gray-900 outline-hidden placeholder:text-gray-400 sm:text-sm/6"
        />
        <MagnifyingGlassIcon
          aria-hidden="true"
          className="pointer-events-none col-start-1 row-start-1 size-5 self-center text-gray-400"
        />
      </form>
      <div className="flex items-center gap-x-4 lg:gap-x-6">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
          <span className="sr-only">View notifications</span>
          <BellIcon aria-hidden="true" className="size-6" />
        </button>

        {/* Separator */}
        <div
          aria-hidden="true"
          className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
        />

        {/*  */}
        <div className="flex items-center">
          <UserIcon aria-hidden="true" className="size-6 text-gray-400" />
          <span
            aria-hidden="true"
            className="ml-4 text-sm/6 font-semibold text-gray-900">
            Open Space
          </span>
        </div>
      </div>
    </div>
  );
};
