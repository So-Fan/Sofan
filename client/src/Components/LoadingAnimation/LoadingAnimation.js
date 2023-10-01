import React from "react";
import "./LoadingAnimation.css";
function LoadingAnimation({ ellipsisAnimation }) {
  return (
    <>
      {ellipsisAnimation ? (
        <>
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </>
      ) : (
        <>
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </>
      )}
    </>
  );
}

export default LoadingAnimation;
