import React from "react";
import { observer } from "mobx-react-lite";
import { Navigate, useLocation } from "react-router-dom";
import store from "../store/index";

function RequireAuth({ children }) {
  let location = useLocation();

  if (!store.isLoged) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default observer(RequireAuth);
