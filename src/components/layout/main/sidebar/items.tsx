import { FilmIcon, HomeIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router";
import clsx from "clsx";

const items = [
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "All Movies", href: "/movies", icon: FilmIcon },
];

interface Props {
  onClose: () => void;
}

export const Items = ({ onClose }: Props) => {
  return (
    <li>
      <ul role="list" className="-mx-2 space-y-1">
        {items.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.href}
              onClick={onClose}
              className={({ isActive }) =>
                clsx(
                  isActive
                    ? "bg-gray-50 text-indigo-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                  "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold",
                )
              }>
              <item.icon
                className="size-6 shrink-0 group-hover:text-indigo-600"
                aria-hidden="true"
              />
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </li>
  );
};
