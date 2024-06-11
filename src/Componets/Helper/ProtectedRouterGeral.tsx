import React from "react";
import UserContext from "../../Context/UserContext";
import { Navigate } from "react-router-dom";

const ProtectedRouterGeral = ({ children }: React.PropsWithChildren) => {
  const { login } = React.useContext(UserContext);

  if (login === true) {
    return children;
  } else if (login === false) {
    return <Navigate to="/login" />;
  } else {
    return <></>;
  }
};

export default ProtectedRouterGeral;
