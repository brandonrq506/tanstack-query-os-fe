import { type Colors, isColor } from "../utils/color-utils";
import { getAuthorInitials } from "../utils/get-author-initials";

const variants: Record<Colors, string> = {
  red: "bg-red-600",
  orange: "bg-orange-600",
  amber: "bg-amber-600",
  yellow: "bg-yellow-500",
  lime: "bg-lime-600",
  green: "bg-green-600",
  emerald: "bg-emerald-600",
  teal: "bg-teal-600",
  cyan: "bg-cyan-600",
  sky: "bg-sky-600",
  blue: "bg-blue-600",
  indigo: "bg-indigo-600",
  violet: "bg-violet-600",
  fuchsia: "bg-fuchsia-600",
  pink: "bg-pink-600",
  rose: "bg-rose-600",
};

interface Props {
  authorName: string;
  authorColor: string;
}

export const CommentAuthor = ({ authorName, authorColor }: Props) => {
  const validColor = isColor(authorColor) ? authorColor : "indigo";
  const variant = variants[validColor];

  return (
    <div
      className={`flex size-8 items-center justify-center rounded-full text-sm font-medium text-white ${variant}`}>
      {getAuthorInitials(authorName)}
    </div>
  );
};
