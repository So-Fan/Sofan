import React from 'react'
import "./FeedSuggestions.css"
import { Link } from 'react-router-dom'
import DataSuggestions from "./fakedata/dataSuggestions.json"
import FeedSuggestionTemplate from './FeedSuggestionTemplate/FeedSuggestionTemplate'
const FeedSuggestions = () => {
  return (
    <div className='feedsuggestions-component'>
      <div className='feedlaunchpad-header-container'>
        <span className='feedlaunchpad-header-title'>Suggestions</span>
        <Link to='/Launchpad' className='feedlaunchpad-header-button feedlaunchpad-header-button-suggestion'>Voir plus</Link>
      </div>
      {DataSuggestions.suggestions.map((suggestion) => (
        <FeedSuggestionTemplate name={suggestion.name} type={suggestion.type} athleteProfilePicture={suggestion.athleteProfilePicture} id={suggestion.id} />
      ))}
    </div>
  )
}

export default FeedSuggestions
