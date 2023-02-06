import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import SignUpAthletePage from "./Pages/SignUpAthlete/SignUpAthletePage/SignUpAthletePage";
import { useState } from "react";
import PostsFeed from "./Components/PostsComponents/PostsFeed/PostsFeed";
import FullPagePost from "./Pages/FullPagePost/FullPagePost";
import "./App.css";
function App() {
  const [isProfileClicked, setIsProfileClicked] = useState(false);
  const [waitingPage, setWaitingPage] = useState(true);
  const handleProfileClick = (e) => {
    console.log(e.target.id);
    if (e.target.id === "navbar-user-profile-img") {
      setIsProfileClicked(true);
    } else {
      setIsProfileClicked(false);
    }
  };

  return (
    <BrowserRouter>
      {/* {waitingPage ? <></> :  <Navbar /> } */}

      {/* <Routes> */}
      {/* <Route index element={<Home waitingPage={waitingPage}/>} /> */}
      <div className="App" onClick={handleProfileClick}>
        <Navbar isProfileClicked={isProfileClicked} />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/signupathlete" element={<SignUpAthletePage />} />
          <Route path="/publication" element={<PostsFeed />} />
          <Route path="/post938098" element={<FullPagePost />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
