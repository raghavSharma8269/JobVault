import React, { JSX } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token");

  // if the token is not present, redirect to the welcome page
  if (!token) {
    return <Navigate to="/welcome" replace />;
  }
  return children;
};
export default PrivateRoute;
