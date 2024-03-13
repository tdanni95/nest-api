import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { jsx } from "@emotion/react";

interface PrivateRouteProps {
  to: string;
  children: JSX.Element;
}

export const PrivateRoute = (props: PrivateRouteProps) => {
  const token = localStorage.getItem("token");

  if (token === null) {
    return Navigate({ to: props.to });
  } else {
    return props.children;
  }
};
