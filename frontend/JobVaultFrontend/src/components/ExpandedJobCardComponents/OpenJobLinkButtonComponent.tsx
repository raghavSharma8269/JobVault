import React from "react";

interface Props {
  url: string;
}

const OpenJobLinkButtonComponent: React.FC<Props> = ({ url }) => {
  return (
    <a
      className="bi bi-arrow-up-right-square default-text-color icon-btn"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        fontSize: "2rem",
        cursor: "pointer",
        display: "inline-block",
      }}
    ></a>
  );
};

export default OpenJobLinkButtonComponent;
