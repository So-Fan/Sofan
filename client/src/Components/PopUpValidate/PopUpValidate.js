import React from "react";
import "./PopUpValidate.css";
import Button from "../Button/Button";

const PopUpValidate = ({text, customWidth}) => {
  const validate =
    "https://firebasestorage.googleapis.com/v0/b/sofan-app.appspot.com/o/Vector.svg?alt=media&token=4296ec1f-711a-4dac-aabb-ccb544448027";
  return (
    <div className="popupvalidate-component">
      <img src={validate} alt="validate" />
      <span style={{width:"251px"}}>{text}</span>
      <Button
        style={popUpValidateButton}
        text={"Fermer"}
        hover={"button-component-create-post"}
        customMediaQueries={".button-component:active{transform: scale(0.92)}"}
      />
    </div>
  );
};

export default PopUpValidate;

const popUpValidateButton = {
  width: "410px",
  height: "56px",
  borderRadius: "10px",
  background: "#F6D463",
  outline: "none",
  border: "transparent",
  marginTop: "85px",
  marginBottom: "20px",
  fontFamily: "britanica-heavy",
  fontSize: "20px",
  lineHeight: "normal",
};
