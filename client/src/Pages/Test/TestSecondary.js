import React, {useState} from 'react'
import "./TestSecondary.css"
import MintPopUpTemplate from '../../Components/MintPopUp/MintPopUp'
import MintPopUpBuy from '../../Components/MintPopUp/MintPopUpBuy/MintPopUpBuy'
import Modal from '../../Components/Modal/Modal';
import TemplatePopUp from '../../Components/TemplatePopUp/TemplatePopUp';
import AthleteSuggestPopUp from '../../Components/TemplatePopUp/AthleteSuggestPopUp/AthleteSuggestPopUp';
import AthleteFollowingSupportingPopUp from '../../Components/TemplatePopUp/AthleteFollowingSupportingPopUp/AthleteFollowingSupportingPopUp';
import NotificationPopUp from '../../Components/Navbar/NotificationPopUp/NotificationPopUp';
import AthleteFollowersFansPopUp from '../../Components/TemplatePopUp/AthleteFollowersFansPopUp/AthleteFollowersFansPopUp';
import PopUpBuyNft from '../../Components/PopUpBuyNft/PopUpBuyNft';
import PopUpPlaceBid from '../../Components/PopUpPlaceBid/PopUpPlaceBid';
import PopUpConfirmationOffer from '../../Components/PopUpConfirmationOffer/PopUpConfirmationOffer';
import CreationPostPoll from '../../Components/CreationPostPoll/CreationPostPoll';
import Signup from '../../Components/LoginSignupPopUp/Signup';
import LoginSignUpScreen from '../LoginSignUpPage/LoginSignUpScreen';
function TestSecondary() {

  return (
    <div className='test-secondary-container'>
       <Signup/>

    </div>
  )
}

export default TestSecondary