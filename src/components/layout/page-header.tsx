import { clsx } from "clsx";

type Props = {
  className?: string;
  title: string;
};

export const PageHeader = ({ className, title }: Props) => {
  return (
    <div className={clsx("flex items-center justify-between", className)}>
      <div className="min-w-0 flex-1">
        <h1 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {title}
        </h1>
      </div>
    </div>
  );
};
