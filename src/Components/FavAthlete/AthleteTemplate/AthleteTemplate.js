import React from 'react'
import "./AthleteTemplate.css"
const AthleteTemplate = ({href, src, alt, athleteName}) => {
  return (
    <a href={href} className="athleteTemplate-container"
    //  style={{backgroundImage: `url(${src})`, backgroundPosition: 'center'}}
     >
      <span>{athleteName}</span>
    </a>
  )
}

export default AthleteTemplate
