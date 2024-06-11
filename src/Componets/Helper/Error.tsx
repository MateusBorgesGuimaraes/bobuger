import React from "react";

type IErro = {
  error: string;
};

const Error = ({ error }: IErro) => {
  if (!error) return null;
  return (
    <p
      style={{
        color: "#f31",
        margin: "1rem 0",
        fontSize: "14px",
        fontWeight: "600",
      }}
    >
      {error}
    </p>
  );
};

export default Error;
