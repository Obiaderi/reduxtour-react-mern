import React from "react";
import { useSelector } from "react-redux";
import LoadToRedirect from "./LoadToRedirect";

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  return user ? children : <LoadToRedirect />;
};

export default PrivateRoute;
