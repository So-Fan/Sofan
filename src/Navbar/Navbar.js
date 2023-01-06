import React from 'react'
import "./Navbar.css"
import SofanLogoBlack from "../Assets/image/sofan_black.svg"
import Searchbar from './Searchbar/Searchbar'
import NavIcon from './NavIcon/NavIcon'
const Navbar = () => {
  return (
    <section className='navbar-section'>
      <img className='navbar-main-logo' src={SofanLogoBlack} alt="Sofan" />
      <Searchbar />
      <NavIcon name="Home" link="/"/>
      <NavIcon name="Launchpad" link="/Launchpad"/>
    </section>
  )
}

export default Navbar
