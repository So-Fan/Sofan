import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const Index = () => {
  const [isProfileClicked, setIsProfileClicked] = useState(false);
  const handleProfileClick = (e) => {
    console.log(e.target.id);
    if (e.target.id === "navbar-user-profile-img") {
      setIsProfileClicked(true);
    } else {
      setIsProfileClicked(false);
    }
  };

  return (
    <section onClick={handleProfileClick} className="page-container">
      <App handleProfileClick={handleProfileClick} isProfileClicked={isProfileClicked} />
    </section>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Index />);
