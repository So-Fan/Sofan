import React from "react";
import "./Modal.css";
import CrossBlack from "../../Assets/Image/cross.svg";
import CrossWhite from "../../Assets/Image/cross_white.svg";
const Modal = (props) => {
    // Need top pass setState and style
    // setState is the function link to the state that render the Modal Component
    // style is an object to position the cross with top, bottom, left and right
    // by default the cross is black. To make it white pass a prop named color and write "white"
  const handleModalClick = (e) => {
    if (
      e.target.id === "modal-component" ||
      e.target.id === "modal-component-cross"
    ) {
      props.setState(false);
    }
  };
  return (
    <div id="modal-component" onClick={handleModalClick}>
      <div className="modal-component-wrap">
        <img id="modal-component-cross" src={props.color ? CrossWhite : CrossBlack} alt="cross" style={props.style} />
        {props.children}
        </div>
    </div>
  );
};

export default Modal;