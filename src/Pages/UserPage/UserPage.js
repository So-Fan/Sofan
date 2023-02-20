import React from 'react'
import './UserPage.css'
import { Link } from 'react-router-dom'
const UserPage = () => {
  return (
    <div>
      <Link to="/user/nftcard">
        Nft Card Component
      </Link>
      <Link to="/user/profilesubmenu">
      Profile Submenu
      </Link>
    </div>
  )
}

export default UserPage
