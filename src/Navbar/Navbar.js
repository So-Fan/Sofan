import React from 'react'
import "./Navbar.css"
import SofanLogoBlack from "../Assets/image/sofan_black.svg"
import Searchbar from './Searchbar/Searchbar'
import NavLink from './NavLink/NavLink'
const Navbar = () => {
  return (
    <section className='navbar-section'>
      <img className='navbar-main-logo' src={SofanLogoBlack} alt="Sofan" />
      <Searchbar />
      <NavLink name="Home" link="/"/>
      <NavLink name="Launchpad" link="/Launchpad"/>
    </section>
  )
}

export default Navbar
