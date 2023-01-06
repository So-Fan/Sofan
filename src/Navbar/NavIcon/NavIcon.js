import React from 'react'
import "./NavIcon.css"
const NavIcon = ({name, link}) => {
  return (
    <a className='navbar-navicon' href={link}>
      {name}
    </a>
  )
}

export default NavIcon
