import React from 'react'
import AthleteTemplate from '../AthleteTemplate/AthleteTemplate'
import LeBron from '../fakeData/lebron.svg'
const Carroussel = () => {
  return (
    <>
      <AthleteTemplate href={"/profile/lebron"} src={LeBron} alt={"lebron james"} athleteName={"Lebron James"} />
    </>
  )
}

export default Carroussel
