import React, { useState, useEffect } from "react";
import "./Modal.css";
import CrossBlack from "../../Assets/Image/cross.svg";
import CrossWhite from "../../Assets/Image/cross_white.svg";
// import { disableBodyScroll, enableBodyScroll, pixelScrolledAthleteProfilePage } from 'scroll-lock';
const Modal = (props) => {
  // Need top pass setState and style
  // setState is the function link to the state that render the Modal Component
  // style is an object to position the cross with top, bottom, left and right
  // by default the cross is black. To make it white pass a prop named color and write "white"
  // If you want to lock scroll when clicked add document.querySelector('body').classList.add('scroll-lock') to your handle HTML Element that triggers the modal to pop
  const handleModalClick = (e) => {
    if (
      e.target.id === "modal-component" ||
      e.target.id === "modal-component-cross" ||
      e.target.id === "custom-close-button"
    ) {
      if (props.setState) {
        props.setState(false);
      }
      if (props.setState2) {
        props.setState2(false);
      }
      if (props.setState3) {
        props.setState3(false);
      }
      if (props.setState4) {
        props.setState4(false);
      }
      // retirer le scroll lock lorsque le modal n'est plus la
      document.querySelector("body").classList.remove("scroll-lock");
    }
  };
  useEffect(() => {
    document.querySelector("body").classList.add("scroll-lock");
  }, []);
  // console.log(props.isPostClicked)
  return (
    <div
      id="modal-component"
      style={{ marginTop: props.dynamicPositionPopUpMargin }}
      onMouseDown={handleModalClick}
      onClick={props.handleSignupPopupDisplay}
    >
      <div className="modal-component-wrap">
        <img
          id="modal-component-cross"
          src={props.color ? CrossWhite : CrossBlack}
          alt="cross"
          style={props.style}
        />
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
