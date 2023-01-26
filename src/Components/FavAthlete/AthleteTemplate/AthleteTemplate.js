import React from 'react'
import "./AthleteTemplate.css"
const AthleteTemplate = ({href, src, alt, athleteName}) => {
  return (
    <a href={href} className="athleteTemplate-container"
     style={{backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%), url(${src})`, backgroundPosition: 'center'}}
     >
      <span>{athleteName}</span>
    </a>
  )
}

export default AthleteTemplate
