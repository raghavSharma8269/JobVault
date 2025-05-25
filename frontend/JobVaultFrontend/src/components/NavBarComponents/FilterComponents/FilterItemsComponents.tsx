import React, { useState } from "react";
import ResetSearchParametersIconComponent from "../ResetSearchParametersIconComponent.tsx";
import FilterDropDownButtonComponent from "./FilterDropDownButtonComponent.tsx";

interface FilterItemsComponentsProps {
  filter: string;
  setFilter: (filter: string) => void;
  onFilter: () => void;
}

const FilterItemsComponents: React.FC<FilterItemsComponentsProps> = ({
  filter,
  setFilter,
  onFilter,
}) => {
  const [activeSection, setActiveSection] = useState<
    "applied" | "interview" | "accepted" | "rejected" | "none"
  >("none");

  return (
    <div className="dropdown" style={{ marginLeft: "10px" }}>
      {activeSection === "none" && <FilterDropDownButtonComponent />}
      {activeSection === "applied" && (
        <FilterDropDownButtonComponent
          className="btn blue-bg dropdown-toggle default-text-color"
          text="Applied"
        />
      )}
      {activeSection === "interview" && (
        <FilterDropDownButtonComponent
          className="btn green-bg dropdown-toggle default-text-color"
          text="Interview"
        />
      )}
      {activeSection === "accepted" && (
        <FilterDropDownButtonComponent
          className="btn purple-bg dropdown-toggle default-text-color"
          text="Accepted"
        />
      )}
      {activeSection === "rejected" && (
        <FilterDropDownButtonComponent
          className="btn red-bg dropdown-toggle default-text-color"
          text="Rejected"
        />
      )}

      <ul className="dropdown-menu" style={{ backgroundColor: "#292b38" }}>
        <li>
          <a
            className="dropdown-item default-text-color"
            style={{ backgroundColor: "blue", borderRadius: "10px" }}
            href="#"
            onClick={() => {
              setActiveSection("applied");
              setFilter("APPLIED");
              onFilter();
            }}
          >
            Applied
          </a>
        </li>
        <li>
          <a
            className="dropdown-item default-text-color"
            style={{ backgroundColor: "green", borderRadius: "10px" }}
            href="#"
            onClick={() => {
              setActiveSection("interview");
              setFilter("INTERVIEW");
              onFilter();
            }}
          >
            Interview
          </a>
        </li>
        <li>
          <a
            className="dropdown-item default-text-color"
            style={{ backgroundColor: "#7400f0", borderRadius: "10px" }}
            href="#"
            onClick={() => {
              setActiveSection("accepted");
              setFilter("ACCEPTED");
              onFilter();
            }}
          >
            Accepted
          </a>
        </li>
        <li>
          <a
            className="dropdown-item default-text-color"
            style={{ backgroundColor: "red", borderRadius: "10px" }}
            href="#"
            onClick={() => {
              setActiveSection("rejected");
              setFilter("REJECTED");
              onFilter();
            }}
          >
            Rejected
          </a>
        </li>
        <li>
          <a
            className="dropdown-item light-bg default-text-color"
            href="#"
            onClick={() => {
              setActiveSection("none");
              setFilter("");
              onFilter();
            }}
          >
            Reset...
          </a>
        </li>
      </ul>

      {/*<ResetSearchParametersIconComponent />*/}
    </div>
  );
};
export default FilterItemsComponents;
