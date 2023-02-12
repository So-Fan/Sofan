import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";

// if no border on button, set borderColor prop to 'transparent'
const Button = ({
  isLink,
  to,
  backgroundColor,
  borderColor,
  borderRadius,
  width,
  height,
  text,
}) => {
  return (
    <>
      {isLink ? (
        <Link
          className="button-component"
          to={to}
          style={{
            backgroundColor: `${backgroundColor}`,
            border: `1px solid ${borderColor}`,
            borderRadius: `${borderRadius}`,
            width: `${width}`,
            height: `${height}`,
          }}
        >
          {text}
        </Link>
      ) : (
        <button
          className="button-component"
          style={{
            backgroundColor: `${backgroundColor}`,
            border: `1px solid ${borderColor}`,
            borderRadius: `${borderRadius}`,
            width: `${width}`,
            height: `${height}`,
          }}
        >
          {text}
        </button>
      )}
    </>
  );
};

export default Button;
