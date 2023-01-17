import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client"
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home"
import SignUpAthletePage from "./Pages/SignUpAthlete/SignUpAthletePage/SignUpAthletePage";
import Publication from "./Components/Publication/Publication";
function App() {
  const [waitingPage, setWaitingPage] = useState(true)
  return (
    // <>
    <BrowserRouter>
    {waitingPage ? <></> :  <Navbar /> }
      
      <Routes>
        <Route index element={<Home waitingPage={waitingPage}/>} />
        <Route path="/signupathlete" element={<SignUpAthletePage />} />
        <Route path="/publication" element={<Publication/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;