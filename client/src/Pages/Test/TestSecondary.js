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
function TestSecondary() {
  const [isCreatePostButtonClicked, setIsCreatePostButtonClicked] =
    useState(false);
    const handleCreatePostClick = () => {
      setIsCreatePostButtonClicked(true);
    };
  return (
    <div className='test-secondary-container'>
        {/* <button className='test-secondary-button' onClick={handleCreatePostClick}>Bouton</button>
        {isCreatePostButtonClicked && (
          <Modal
          setState={setIsCreatePostButtonClicked}
          style={{ top: "24px", right: "20px" }} 
          >
            <AthleteFollowingSupportingPopUp/>
        </Modal>
      )}
      <AthleteSuggestPopUp/> */}
      <NotificationPopUp/>
      {/* <MintPopUpTemplate/> */}
      {/* <AthleteSuggestPopUp/> */}
      {/* <AthleteFollowersFansPopUp/> */}
      {/* <PopUpBuyNft/> */}
      <PopUpPlaceBid/>
      <MintPopUpBuy/>
    </div>
  )
}

export default TestSecondary