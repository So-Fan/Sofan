import React from 'react'
import "./AthleteTemplate.css"
import Star from "../../../Assets/image/star.svg";
const AthleteTemplate = ({href, src, athleteName, isFan}) => {
  return (
    <a href={href} className={isFan ? "athleteTemplate-container athleteTemplate-container-fan" : "athleteTemplate-container"}
     style={{backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%), url(${src})`, backgroundPosition: 'center'}}
     >
      {isFan && <img src={Star} alt="star" className="athleteTemplate-star" />}
      <span>{athleteName}</span>
    </a>
  )
}

export default AthleteTemplate
