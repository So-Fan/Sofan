import React, {useState, useEffect} from 'react'
import "./AthleteProfileEvent.css"
import AthleteProfileEventTemplate from './AthleteProfileEventTemplate/AthleteProfileEventTemplate';
const AthleteProfileEvent = ({dataEvents}) => {

  return (
    <div className='athleteprofileevent-component'>
      {dataEvents?.map((event) => (
        <AthleteProfileEventTemplate eventData={event} />
      ))}
      {dataEvents?.length % 3 === 1 && <><AthleteProfileEventTemplate isTransparent={true}/><AthleteProfileEventTemplate isTransparent={true}/></>}
      {dataEvents?.length % 3 === 2 && <AthleteProfileEventTemplate isTransparent={true}/>}
    </div>
  )
}

export default AthleteProfileEvent
