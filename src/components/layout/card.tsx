import { clsx } from "clsx";

type Props = {
  children: React.ReactNode;
  className?: string;
  bgStyles?: string;
};

export const Card = ({ children, className, bgStyles = "bg-white" }: Props) => {
  return (
    <div
      className={clsx("rounded-md px-4 py-3 shadow-sm", className, bgStyles)}>
      {children}
    </div>
  );
};
