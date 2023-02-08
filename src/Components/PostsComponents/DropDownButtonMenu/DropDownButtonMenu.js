import React, { useState } from "react";
import "./DropDownButtonMenu.css";
import DropDownMenu from "../DropDownMenu/DropDownMenu";

function DropDownButtonMenu({ dropDownMenuSize, setIsDropDownButtonClicked, isDropDownButtonClicked }) {
  const handleClickDropDownButton = (e) => {
    e.preventDefault();
    setIsDropDownButtonClicked(!isDropDownButtonClicked);

console.log(isDropDownButtonClicked)
    
  };

  return (
    <>
      {/* <>{isDropDownButtonClicked && <DropDownButtonMenu />}</> */}
      <>
        <button
          onClick={handleClickDropDownButton}
          className="dropdown-menu-button-container"
        >
          <div className="dropdown-button-publication">
            <div className={`dropdown-button-point ${dropDownMenuSize}`}></div>
            <div className={`dropdown-button-point ${dropDownMenuSize}`}></div>
            <div className={`dropdown-button-point ${dropDownMenuSize}`}></div>
          </div>
        </button>
      </>
    </>
  );
}
export default DropDownButtonMenu;
