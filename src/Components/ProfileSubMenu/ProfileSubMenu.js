import React, { useState } from "react";
import Button from "../Button/Button";
import "./ProfileSubMenu.css";
import Arrow from '../../Assets/Image/arrow_bottom.svg'
const ProfileSubMenu = () => {
    const [isProfileSubMenuButtonClicked, setIsProfileSubMenuButtonClicked] = useState([true, false, false, false])
     // useEffect au chargement pour se servir de ce submenu ailleurs et map les button par rapport à la page qui est chargé et modifié condition if else
    const handleProfileSubMenuButtonClicked = e => {
        console.log(e.target.innerHTML);
        if(e.target.innerHTML === "Collected NFT"){
            setIsProfileSubMenuButtonClicked([true, false, false, false])
        } else if(e.target.innerHTML === "Activity"){
            setIsProfileSubMenuButtonClicked([false, true, false, false])
        } else if(e.target.innerHTML === "Offres formulées"){
            setIsProfileSubMenuButtonClicked([false, false, true, false])
        } else if(e.target.innerHTML === "Offres reçues"){
            setIsProfileSubMenuButtonClicked([false, false, false ,true])
        }
    }
    return (
    <div className="profileSubMenu-component">
      <div className={isProfileSubMenuButtonClicked[0] ? "profilesubmenu-wrap-clicked profilesubmenu-wrap" : "profilesubmenu-wrap"}>
        <Button onClick={handleProfileSubMenuButtonClicked} text="Collected NFT" style={ProfileSubMenuButtonStyle.styling}/>
      </div>
      <div className={isProfileSubMenuButtonClicked[1] ? "profilesubmenu-wrap-clicked profilesubmenu-wrap" : "profilesubmenu-wrap"}>
        <Button onClick={handleProfileSubMenuButtonClicked} text="Activity" style={ProfileSubMenuButtonStyle.styling}/>
      </div>
      <div className={isProfileSubMenuButtonClicked[2] ? "profilesubmenu-wrap-clicked profilesubmenu-wrap profilesubmenu-arrow-wrap" : "profilesubmenu-wrap profilesubmenu-arrow-wrap"}>
        <Button onClick={handleProfileSubMenuButtonClicked} text="Offres formulées" style={ProfileSubMenuButtonStyle.styling}/>
        <img src={Arrow} alt="Arrow bottom" />
      </div>
      <div className={isProfileSubMenuButtonClicked[3] ? "profilesubmenu-wrap-clicked profilesubmenu-wrap profilesubmenu-arrow-wrap" : "profilesubmenu-wrap profilesubmenu-arrow-wrap"}>
        <Button onClick={handleProfileSubMenuButtonClicked} text="Offres reçues" style={ProfileSubMenuButtonStyle.styling}/>
        <img src={Arrow} alt="Arrow bottom" />
      </div>
    </div>
  );
};

export default ProfileSubMenu;

const ProfileSubMenuButtonStyle = {
  styling: {
    backgroundColor: "transparent",
    border: "none",
    height: "100%",
    fontFamily: 'Britanica-Heavy',
    fontSize: "20px",
    fontWeight: "400",
    // position: "absolute",
  },
  //   pseudoClasses:
  //     ".button-component:hover{border-bottom: 4px solid #F8DB4A !important}",
};
