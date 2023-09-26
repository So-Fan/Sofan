import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";

// if no border on button, set borderColor to 'transparent'
const Button = ({
  isLink,
  to,
  style,
  customMediaQueries,
  text,
  onClick,
  id,
  createPostButtonClass,
  hover,
  active,
  disabled,
  loading,
  settingsPage,
}) => {
  return (
    <>
      <style>
        {`
    ${customMediaQueries}
    `}
      </style>
      {isLink ? (
        <Link
          className={`button-component ${createPostButtonClass} ${hover} ${active}`}
          to={to}
          style={style}
          onClick={onClick}
          id={id}
        >
          {text}
        </Link>
      ) : (
        <button
          className={`button-component ${createPostButtonClass} ${hover} ${active}`}
          style={style}
          onClick={onClick}
          id={id}
          disabled={disabled}
        >
          {loading ? (
            <div
              className={
                settingsPage
                  ? "lds-ellipsis lds-ellipsis-settings-page"
                  : "lds-ellipsis"
              }
            >
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : (
            text
          )}
        </button>
      )}
    </>
  );
};

export default Button;
