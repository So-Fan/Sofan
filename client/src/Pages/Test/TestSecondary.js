import React, {useState} from 'react'
import "./TestSecondary.css"
import MintPopUpTemplate from '../../Components/MintPopUp/MintPopUp'
import MintPopUpBuy from '../../Components/MintPopUp/MintPopUpBuy/MintPopUpBuy'
import Modal from '../../Components/Modal/Modal';
import TemplatePopUp from '../../Components/TemplatePopUp/TemplatePopUp';
import AthleteSuggestPopUp from '../../Components/TemplatePopUp/AthleteSuggestPopUp/AthleteSuggestPopUp';
function TestSecondary() {
  const [isCreatePostButtonClicked, setIsCreatePostButtonClicked] =
    useState(false);
    const handleCreatePostClick = () => {
      setIsCreatePostButtonClicked(true);
    };
  return (
    <div className='test-secondary-container'>
        {/* <button onClick={handleCreatePostClick}>Bouton</button>
        {isCreatePostButtonClicked && (
          <Modal
          setState={setIsCreatePostButtonClicked}
          style={{ top: "24px", right: "20px" }} 
          >
          <MintPopUpTemplate/>
        </Modal>
      )} */}
      {/* <TemplatePopUp/> */}
      <AthleteSuggestPopUp/>
    </div>
  )
}

export default TestSecondary