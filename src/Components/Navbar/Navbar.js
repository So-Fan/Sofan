import React from 'react'
import "./Navbar.css"
import SofanLogo2 from "../Assets/image/sofanlogo2.svg"
import SofanLogoBlack from "../Assets/image/sofan_black.svg"
import Searchbar from './Searchbar/Searchbar'
import NavLink from './NavLink/NavLink'
import NavIcon from './NavIcon/NavIcon'
import notification from "../Assets/image/notification.svg"
import NavProfile from './NavProfile/NavProfile'
import profile from "../Assets/image/profile.svg";
const Navbar = () => {
  return (
    <section className='navbar-section'>
      <img className='navbar-main-logo' src={SofanLogo2} alt="Sofan" />
      {/* <img className='navbar-main-logo' src={SofanLogoBlack} alt="Sofan" /> */}
      <Searchbar />
      <NavLink name="Home" link="/"/>
      <NavLink name="Launchpad" link="/Launchpad"/>
      <div className='navbar-vertical'></div>
      <NavIcon src={notification} />
      <div className='navbar-vertical'></div>
      <NavProfile src={profile} />
    </section>
  )
}

export default Navbar
