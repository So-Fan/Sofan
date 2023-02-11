import React from "react";
import "./DropDownButtonMenu.css";
function DropDownButtonMenu({ dropDownMenuSize }) {
  
  return (
    <>
      <button  className="button-dropdown-menu">
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
