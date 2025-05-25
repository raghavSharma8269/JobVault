import React from "react";

const ResetSearchParametersIconComponent = () => {
  return (
    <i
      className="bi bi-arrow-clockwise default-text-color icon-btn"
      style={{
        fontSize: "2rem",
        cursor: "pointer",
        display: "inline-block",
        position: "absolute",
        top: "-3px",
        left: "110px",
      }}
      onClick={() => alert("Reset Search Parameters")}
    />
  );
};
export default ResetSearchParametersIconComponent;
