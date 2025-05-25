import SortByDropdownComponent from "./NavBarComponents/SortByComponents/SortByDropdownComponent.tsx";
import AddJobIcon from "./NavBarComponents/AddJobIcon.tsx";
import FilterItemsComponents from "./NavBarComponents/FilterComponents/FilterItemsComponents.tsx";
import React from "react";

interface NavBarProps {
  search: string;
  setSearch: (value: string) => void;
  onSearch: () => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  onSort: () => void;
  filter: string;
  setFilter: (filter: string) => void;
  onFilter: () => void;
}

const NavBarComponent: React.FC<NavBarProps> = ({
  search,
  setSearch,
  onSearch,
  sortBy,
  setSortBy,
  onSort,
  filter,
  setFilter,
  onFilter,
}) => {
  return (
    <nav
      className="navbar"
      style={{
        marginBottom: "-40px",
        borderRadius: "10px",
        backgroundColor: "#292b38",
        paddingTop: "15px",
        paddingBottom: "15px",
      }}
    >
      <div
        className="container-fluid d-flex flex-wrap align-items-center justify-content-between"
        style={{ backgroundColor: "#292b38" }}
      >
        {/* Groups the sort, filter, add job buttons */}
        <div className="d-flex align-items-center gap-3">
          <SortByDropdownComponent
            sortBy={sortBy}
            setSortBy={setSortBy}
            onSort={onSort}
            filter={filter}
            setFilter={setFilter}
            onFilter={onFilter}
          />

          <FilterItemsComponents
            filter={filter}
            setFilter={setFilter}
            onFilter={onFilter}
          />

          <AddJobIcon />
        </div>

        {/* aligns search bar to right */}
        <form
          className="d-flex mt-2 mt-md-0"
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            onSearch();
          }}
        >
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ backgroundColor: "#1c1d26", color: "#9e9ca1" }}
          />
          <button className="btn purple-bg default-text-color">
            <i className="bi bi-search"></i>
          </button>
        </form>
      </div>
    </nav>
  );
};

export default NavBarComponent;
