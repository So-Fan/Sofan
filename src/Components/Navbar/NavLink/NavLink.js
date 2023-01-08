import React from 'react'
import "./NavLink.css"
const NavLink = ({name, link}) => {
  return (
    <a className='navbar-navicon' href={link}>
      {name}
    </a>
  )
}

export default NavLink
