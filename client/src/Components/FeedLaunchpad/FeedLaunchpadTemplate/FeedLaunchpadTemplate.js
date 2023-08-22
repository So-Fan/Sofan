import React from "react";
import "./FeedLaunchpadTemplate.css";
import { Link } from "react-router-dom";
const FeedLaunchpadTemplate = ({
  title,
  athlete,
  img,
  athleteProfilePicture,
  id,
}) => {
  return (
    <Link
      to={id}
      className="feedlaunchpad-content-container"
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="feedlaunchpad-content-wrap">
        <div className="feedlaunchpad-content-subwrap">
          <div>
            <img src={athleteProfilePicture} alt="athlete profile" />
            <span className="">By {athlete}</span>
          </div>
          <span className="feedlaunchpad-content-title">{title}</span>
        </div>
      </div>
    </Link>
  );
};

export default FeedLaunchpadTemplate;
