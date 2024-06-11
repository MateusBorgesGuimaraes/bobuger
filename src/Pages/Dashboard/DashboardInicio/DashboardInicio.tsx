import React, { useContext } from "react";
import UserContext from "../../../Context/UserContext";

const DashboardInicio = () => {
  const { data } = useContext(UserContext);

  return (
    <div style={{ color: "white", fontSize: "2rem", fontWeight: "bold" }}>
      <p>{data?.usuario}</p>
      <p>{data?.email}</p>
      <p>{data?.numero}</p>
    </div>
  );
};

export default DashboardInicio;
