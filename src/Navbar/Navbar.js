import React from 'react'
import "./Navbar.css"
import SofanLogoBlack from "../Assets/image/sofan_black.svg"
const Navbar = () => {
  return (
    <section className='navbar-section'>
      <img className='navbar-main-logo' src={SofanLogoBlack} alt="Sofan" />
    </section>
  )
}

export default Navbar
