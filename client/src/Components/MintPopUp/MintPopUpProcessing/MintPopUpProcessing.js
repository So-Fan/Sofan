import React from 'react'
import "./MintPopUpProcessing.css"
import explorePicture from "../../../Assets/Image/explorepicture.svg"
function MintPopUpProcessing() {
  return (
    <div className='mint-pop-up-processing'>
        <div>
        <img className='mint-pop-up-processing-image' src={explorePicture} alt="IMAGE EXPLORE D'ATTENTE" />
        </div>
        <div>
            <p className='mint-pop-up-processing-text-title'>Your purchase is processing...</p>
            <p className='mint-pop-up-processing-text'>please do not close the window</p>
        </div>
    </div>
  )
}

export default MintPopUpProcessing