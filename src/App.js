import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client"
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home"
import SignUpAthletePage from "./Pages/SignUpAthlete/SignUpAthletePage/SignUpAthletePage";
import PostsFeed from "./Components/PostsComponents/PostsFeed/PostsFeed";
import FullPagePost from "./Pages/FullPagePost/FullPagePost";
function App() {
  const [waitingPage, setWaitingPage] = useState(false)
  return (
    <BrowserRouter>
    {waitingPage ? <></> :  <Navbar /> }
      <Routes>
        <Route index element={<Home waitingPage={waitingPage}/>} />
        <Route path="/signupathlete" element={<SignUpAthletePage />} />
        <Route path="/publication" element={<PostsFeed/>}/>
        <Route path="/post938098" element={<FullPagePost/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;