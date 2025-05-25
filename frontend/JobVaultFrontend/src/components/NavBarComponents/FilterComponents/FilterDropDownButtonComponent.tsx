import React from "react";

interface FilterDropDownProps {
  className?: string;
  text?: string;
}

const FilterDropDownButtonComponent: React.FC<FilterDropDownProps> = ({
  className = "btn dropdown-toggle default-text-color",
  text = "Filter...",
}) => {
  return (
    <button
      className={className}
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      {text}
    </button>
  );
};
export default FilterDropDownButtonComponent;
