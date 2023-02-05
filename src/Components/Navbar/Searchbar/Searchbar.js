import React from 'react'
import "./Searchbar.css"
import magnifyingGlass from "../../../Assets/image/magnifying_glass.svg"
const Searchbar = () => {
  return (
    <div className='searchbar-container'>
      <img className='searchbar-img' src={magnifyingGlass} alt="magnifying glass" />
      <input className='searchbar-input' type="text" placeholder='Search an athlete, collection or an item' />
    </div>
  )
}

export default Searchbar
