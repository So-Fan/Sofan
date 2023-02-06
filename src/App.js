import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import SignUpAthletePage from "./Pages/SignUpAthlete/SignUpAthletePage";
import { useState } from "react";
function App() {
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
    // <>
    <BrowserRouter>
      <div onClick={handleProfileClick}>
        <Navbar isProfileClicked={isProfileClicked} />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/signupathlete" element={<SignUpAthletePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
