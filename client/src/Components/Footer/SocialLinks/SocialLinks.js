import React from "react";

function SocialLinks({ links }) {
  const containerStyle = {
    maxHeight: "100px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div style={containerStyle} className="social-links-container">
      {links.map((link, index) => (
        <SocialLink key={index} icon={link.icon} url={link.url} />
      ))}
    </div>
  );
}

function SocialLink({ icon, url }) {
  const linkStyle = {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: `2px solid #f6d463`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 10px",
    cursor: "pointer",
  };

  const iconStyle = {
    color: "#f6d463",
    fontSize: "20px",
    width: 30,
  };

  return (
    <a href={url} target="_blank" rel="noreferrer">
      <div style={linkStyle}>
        <img src={icon} style={iconStyle} />
      </div>
    </a>
  );
}

export default SocialLinks;
