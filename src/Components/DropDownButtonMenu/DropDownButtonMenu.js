import React from "react";
import "./DropDownButtonMenu.css";
import AppModal from "../AppModal/AppModal";
function DropDownButtonMenu({ dropDownMenuSize }) {
  // const handleClick = () => {
  //   alert("ATTENTION");
  // }
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <>
      <button onClick={() => setModalShow(true)} className="button-dropdown-menu">
        <div className="dropdown-button-publication">
          <div className={`dropdown-button-point ${dropDownMenuSize}`}></div>
          <div className={`dropdown-button-point ${dropDownMenuSize}`}></div>
          <div className={`dropdown-button-point ${dropDownMenuSize}`}></div>
        </div>
      </button>
      <AppModal
      show={modalShow}
      onHide={() => setModalShow(false)}
      />
    </>
  );
}
export default DropDownButtonMenu;
