import React from "react";
import "./DropDownButtonMenu.css";

function DropDownButtonMenu({
  dropDownMenuSize,
  handleDropdownPostFeedClick,
  id,
}) {
  return (
    <>
      <button
        onClick={handleDropdownPostFeedClick}
        className="dropdown-menu-button-container"
        id={id.toString()}
      >
        <div className="dropdown-button-publication">
          <div className={`dropdown-button-point ${dropDownMenuSize}`}></div>
          <div className={`dropdown-button-point ${dropDownMenuSize}`}></div>
          <div className={`dropdown-button-point ${dropDownMenuSize}`}></div>
        </div>
      </button>
    </>
  );
}
export default DropDownButtonMenu;
