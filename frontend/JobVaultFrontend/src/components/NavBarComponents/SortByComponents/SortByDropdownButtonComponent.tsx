import React from "react";

interface SortByDropdownButtonComponentProps {
  text?: string;
}

const SortByDropdownButtonComponent: React.FC<
  SortByDropdownButtonComponentProps
> = ({ text = "Sort By..." }) => {
  return (
    <button
      className="btn dropdown-toggle purple-bg default-text-color"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      {text}
    </button>
  );
};
export default SortByDropdownButtonComponent;
