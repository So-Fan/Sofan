import React from "react";
import "./DropDownButtonMenu.css";
import dropDownImg from  "../../../Assets/Image/dropdown.svg"

function DropDownButtonMenu({
  dropDownMenuSize,
  dropDownMenuSizeContainer,
  handleDropdownPostFeedClick,
  id,
  fullPagePostModalStyle,
}) {
  // console.log("je me differencie --> ",fullPagePostModalStyle)
  return (
    <>
      <button
        onClick={() => handleDropdownPostFeedClick(id)}
        className={
          fullPagePostModalStyle
            ? `dropdown-menu-button-container-fullpagepost ${dropDownMenuSizeContainer}`
            : `dropdown-menu-button-container ${dropDownMenuSizeContainer}`
        }
        id={id?.toString()}
      >
        <div className="dropdown-button-publication">
          <div className={`dropdown-button-point ${dropDownMenuSize}`}></div>
          <div className={`dropdown-button-point ${dropDownMenuSize}`}></div>
          <div className={`dropdown-button-point ${dropDownMenuSize}`}></div>
        </div>
        {/* <img src={dropDownImg} alt="" /> */}
      </button>
    </>
  );
}
export default DropDownButtonMenu;
