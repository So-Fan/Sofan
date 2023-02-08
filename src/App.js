import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import SignUpAthletePage from "./Pages/SignUpAthlete/SignUpAthletePage/SignUpAthletePage";
import { useState } from "react";
import PostsFeed from "./Components/PostsComponents/PostsFeed/PostsFeed";
import FullPagePost from "./Pages/FullPagePost/FullPagePost";
import PollPost from "./Components/PostsComponents/PollPost/PollPost";
import FavAthlete from "./Components/FavAthlete/FavAthlete";
import FeedSideNavLink from "./Components/FeedSideNavLink/FeedSideNavLink";
import Star from "./Assets/Image/star.svg";
import World from "./Assets/Image/world.svg";
import "./App.css";
import DropDownMenu from "./Components/PostsComponents/DropDownMenu/DropDownMenu";
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
          <Route path="/pollpost" element={<PollPost />} />
        <Route path="/favathlete" element={<FavAthlete />} />
        <Route path="/dropdown" element={<DropDownMenu />} />
        <Route path="/sidenavlink" element={<><FeedSideNavLink href={"/feed/decouverte"} svg={World} alt="World" title="Découverte" imgWidth={"20px"} gap={"11px"} /><FeedSideNavLink href={"/feed/abonnement"} svg={Star} alt="Star" title="Abonnement" imgWidth={"22.83px"} gap={"8.59px"} /></>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
