import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client"
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home"
import SignUpAthletePage from "./Pages/SignUpAthlete/SignUpAthletePage";
import Multiform from "./Pages/multistepform/Multiform";
function App() {
  return (
    // <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/signupathlete" element={<SignUpAthletePage />} />
        <Route path="/multiform" element={<Multiform />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;