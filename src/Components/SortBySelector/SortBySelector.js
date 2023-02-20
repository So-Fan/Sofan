import React from 'react'
import "./SortBySelector.css"
import Arrow from "../../Assets/Image/arrow_bottom.svg"
const SortBySelector = () => {
  return (
    <div className='sortbyselector-component'>
      <span>Plus Récent</span>
      <img src={Arrow} alt="arrow bottom" />
    </div>
  )
}

export default SortBySelector
