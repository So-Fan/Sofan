import React from 'react'
import "./PopUpConfirmationOffer.css"

function PopUpConfirmationOffer() {
  return (
    <div className='popup-confirmation-offer-container'>
        <div className="popup-confirmation-offer-question">
            Voulez-vous vraiment accepter cette offre ?
        </div>
        <div className="popup-confirmation-offer-validate">Oui je souhaite vraiment accepter cette offre.</div>
        <div className="popup-confirmation-offer-cancel">Annuler. Revenir sur la page.</div>
    </div>
  )
}

export default PopUpConfirmationOffer