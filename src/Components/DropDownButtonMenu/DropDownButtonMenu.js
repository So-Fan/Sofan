import React from "react";
import "./DropDownButtonMenu.css"

function DropDownButtonMenu({dropDownMenuSize}) {
  
  return (
    <div className="dropdown-button-publication">
      <div className= {`dropdown-button-point ${dropDownMenuSize}`}></div>
      <div className= {`dropdown-button-point ${dropDownMenuSize}`}></div>
      <div className= {`dropdown-button-point ${dropDownMenuSize}`}></div>
    </div>
  );
}
export default DropDownButtonMenu;