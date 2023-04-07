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
  hover
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
          className={`button-component ${createPostButtonClass} ${hover}`}
          to={to}
          style={style}
          onClick={onClick}
          id={id}
        >
          {text}
        </Link>
      ) : (
        <button
          className={`button-component ${createPostButtonClass} ${hover}`}
          style={style}
          onClick={onClick}
          id={id}
        >
          {text}
        </button>
      )}
    </>
  );
};

export default Button;
