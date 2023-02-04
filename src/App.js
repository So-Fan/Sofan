import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home"
import SignUpAthletePage from "./Pages/SignUpAthlete/SignUpAthletePage/SignUpAthletePage";
import Publication from "./Components/Publication/Publication";
import { useState } from "react";

function App() {
  const [isProfileClickcd, setIsProfileClicked] = useState(false);
  const handleProfileOutClick = () => {
    setIsProfileClicked(false);
  };
  return (
    <BrowserRouter>
      <Navbar
        isProfileClickcd={isProfileClickcd}
        setIsProfileClicked={setIsProfileClicked}
      />
      <Routes>
        <Route index element={<Home handleProfileOutClick={handleProfileOutClick}/>} />
        <Route path="/signupathlete" element={<SignUpAthletePage />} />
        <Route path="/publication" element={<Publication/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
