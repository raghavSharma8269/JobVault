import React from "react";

interface SetStatusButtonComponentProps {
  className?: string;
  text?: string;
}

const SetStatusButtonComponent: React.FC<SetStatusButtonComponentProps> = ({
  className = "btn btn-secondary dropdown-toggle text-start",
  text = "Set Status...",
}) => {
  return (
    <button
      className={className}
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      {text}
    </button>
  );
};
export default SetStatusButtonComponent;
