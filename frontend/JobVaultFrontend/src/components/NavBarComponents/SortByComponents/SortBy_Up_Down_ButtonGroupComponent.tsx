import React from "react";
import SortDownIconComponent from "./SortDownIconComponent.tsx";
import SortUpIconComponent from "./SortUpIconComponent.tsx";
import FilterItemsComponents from "../FilterComponents/FilterItemsComponents.tsx";

interface SortBy_Up_Down_ButtonGroupComponentProps {
  filter: string;
  setFilter: (filter: string) => void;
  onFilter: () => void;
}

const SortBy_Up_Down_ButtonGroupComponent: React.FC<
  SortBy_Up_Down_ButtonGroupComponentProps
> = ({ filter, setFilter, onFilter }) => {
  return (
    <div
      className="btn-group"
      role="group"
      aria-label="Sort toggle button group"
    >
      <input
        type="radio"
        className="btn-check"
        name="btnradio"
        id="btnradio1"
        autoComplete="off"
      />
      <label className="btn btn-outline-primary" htmlFor="btnradio1">
        <SortUpIconComponent />
      </label>

      <input
        type="radio"
        className="btn-check"
        name="btnradio"
        id="btnradio2"
        autoComplete="off"
        defaultChecked
      />
      <label className="btn btn-outline-primary" htmlFor="btnradio2">
        <SortDownIconComponent />
      </label>
      {/*<FilterItemsComponents*/}
      {/*  filter={filter}*/}
      {/*  setFilter={setFilter}*/}
      {/*  onFilter={onFilter}*/}
      {/*/>*/}
    </div>
  );
};

export default SortBy_Up_Down_ButtonGroupComponent;
