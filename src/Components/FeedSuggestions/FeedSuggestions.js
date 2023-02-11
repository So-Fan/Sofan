import React from 'react'
import "./FeedSuggestions.css"
import { Link } from 'react-router-dom'
const FeedSuggestions = () => {
  return (
    <div className='feedsuggestions-component'>
      <div className='feedlaunchpad-header-container'>
        <span className='feedlaunchpad-header-title'>Suggestions</span>
        <Link to='/Launchpad' className='feedlaunchpad-header-button'>see all</Link>
      </div>
    </div>
  )
}

export default FeedSuggestions
