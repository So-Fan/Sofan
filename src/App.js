import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import SignUpAthletePage from "./Pages/SignUpAthlete/SignUpAthletePage/SignUpAthletePage";
import { useState } from "react";
import PostsFeed from "./Components/PostsComponents/PostsFeed/PostsFeed";
import FullPagePost from "./Pages/FullPagePost/FullPagePost";
import PollPost from "./Components/PostsComponents/PollPost/PollPost";
import FavAthlete from './Components/FavAthlete/FavAthlete';
import FeedSideNavLink from './Components/FeedSideNavLink/FeedSideNavLink';
import Star from "./Assets/image/star.svg";
import World from "./Assets/image/world.svg";
function App() {
  // const [waitingPage, setWaitingPage] = useState(true)
  const [isProfileClickcd, setIsProfileClicked] = useState(false);
  const handleProfileOutClick = () => {
    setIsProfileClicked(false);
  };
  return (
    <BrowserRouter>
    {/* {waitingPage ? <></> :  <Navbar /> } */}
      
      {/* <Routes> */}
        {/* <Route index element={<Home waitingPage={waitingPage}/>} /> */}
      <Navbar
        isProfileClickcd={isProfileClickcd}
        setIsProfileClicked={setIsProfileClicked}
      />
      <Routes>
        <Route index element={<Home handleProfileOutClick={handleProfileOutClick}/>} />
        <Route path="/signupathlete" element={<SignUpAthletePage />} />
        <Route path="/publication" element={<PostsFeed />} />
        <Route path="/post938098" element={<FullPagePost />} />
        <Route path="/pollpost" element={<PollPost />} />
        <Route path="/favathlete" element={<FavAthlete />} />
        <Route path="/sidenavlink" element={<><FeedSideNavLink href={"/feed/decouverte"} svg={World} alt="World" title="Découverte" imgWidth={"20px"} gap={"11px"} /><FeedSideNavLink href={"/feed/abonnement"} svg={Star} alt="Star" title="Abonnement" imgWidth={"22.83px"} gap={"8.59px"} /></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
