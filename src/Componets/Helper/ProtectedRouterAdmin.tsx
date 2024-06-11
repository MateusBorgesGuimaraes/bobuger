import React from "react";
import UserContext from "../../Context/UserContext";
import { Navigate } from "react-router-dom";

const ProtectedRouterAdmin = ({ children }: React.PropsWithChildren) => {
  const { admin } = React.useContext(UserContext);

  if (admin === true) {
    return children;
  } else if (admin === false) {
    return <Navigate to="/login" />;
  } else {
    return <></>;
  }
};

export default ProtectedRouterAdmin;
