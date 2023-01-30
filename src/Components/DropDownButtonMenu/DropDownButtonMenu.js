import React from "react";
import "./DropDownButtonMenu.css"
import DropDownMenu from "../DropDownMenu/DropDownMenu";
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