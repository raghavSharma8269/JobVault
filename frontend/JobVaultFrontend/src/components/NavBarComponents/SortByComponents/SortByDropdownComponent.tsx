import React, { useState } from "react";
import SortBy_Up_Down_ButtonGroupComponent from "./SortBy_Up_Down_ButtonGroupComponent.tsx";
import SortByDropdownButtonComponent from "./SortByDropdownButtonComponent.tsx";

interface SortByDropdownComponentProps {
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  onSort: () => void;
  filter: string;
  setFilter: (filter: string) => void;
  onFilter: () => void;
}

const SortByDropdownComponent: React.FC<SortByDropdownComponentProps> = ({
  setSortBy,
  onSort,
  filter,
  setFilter,
  onFilter,
}) => {
  const [activeSection, setActiveSection] = useState<
    "companyName" | "jobTitle" | "dateAdded" | "favorites" | "none"
  >("none");

  return (
    <div className="dropdown">
      {activeSection === "none" && <SortByDropdownButtonComponent />}
      {activeSection === "companyName" && (
        <SortByDropdownButtonComponent text={"Company"} />
      )}
      {activeSection === "jobTitle" && (
        <SortByDropdownButtonComponent text={"Job Title"} />
      )}
      {activeSection === "dateAdded" && (
        <SortByDropdownButtonComponent text={"Date"} />
      )}
      {activeSection === "favorites" && (
        <SortByDropdownButtonComponent text={"Favorites"} />
      )}
      <ul
        className="dropdown-menu custom-filter-dropdown"
        style={{ backgroundColor: "#292b38" }}
      >
        <li>
          <a
            className="dropdown-item light-bg default-text-color"
            href="#"
            onClick={() => {
              setActiveSection("jobTitle");
              setSortBy("jobTitle");
              onSort();
            }}
          >
            Job Title
          </a>
        </li>
        <li>
          <a
            className="dropdown-item light-bg default-text-color"
            href="#"
            onClick={() => {
              setActiveSection("companyName");
              setSortBy("companyName");
              onSort();
            }}
          >
            Company
          </a>
        </li>
        <li>
          <a
            className="dropdown-item light-bg default-text-color"
            href="#"
            onClick={() => {
              setActiveSection("dateAdded");
              setSortBy("dateAdded");
              onSort();
            }}
          >
            Date
          </a>
        </li>
        <li>
          <a
            className="dropdown-item light-bg default-text-color"
            href="#"
            onClick={() => {
              setActiveSection("favorites");
              setSortBy("favorite");
              onSort();
            }}
          >
            Favorites
          </a>
        </li>
      </ul>
      {/*<SortBy_Up_Down_ButtonGroupComponent*/}
      {/*  filter={filter}*/}
      {/*  setFilter={setFilter}*/}
      {/*  onFilter={onFilter}*/}
      {/*/>*/}
    </div>
  );
};
export default SortByDropdownComponent;
