import { Fragment, type PropsWithChildren } from "react";

export const AppProvider = ({ children }: PropsWithChildren) => {
  return <Fragment>{children}</Fragment>;
};
