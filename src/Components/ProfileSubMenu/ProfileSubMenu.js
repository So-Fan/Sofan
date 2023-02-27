import React, { useState } from "react";
import Button from "../Button/Button";
import "./ProfileSubMenu.css";
import Arrow from '../../Assets/Image/arrow_bottom.svg'
const ProfileSubMenu = ({isProfileSubMenuButtonClicked, setIsProfileSubMenuButtonClicked}) => {
    
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
        <Button onClick={handleProfileSubMenuButtonClicked} text="Collected NFT" style={isProfileSubMenuButtonClicked[0] ? ProfileSubMenuButtonStyle.stylingClicked : ProfileSubMenuButtonStyle.stylingNotClicked}/>
      </div>
      <div className={isProfileSubMenuButtonClicked[1] ? "profilesubmenu-wrap-clicked profilesubmenu-wrap" : "profilesubmenu-wrap"}>
        <Button onClick={handleProfileSubMenuButtonClicked} text="Activity" style={isProfileSubMenuButtonClicked[1] ? ProfileSubMenuButtonStyle.stylingClicked : ProfileSubMenuButtonStyle.stylingNotClicked}/>
      </div>
      <div className={isProfileSubMenuButtonClicked[2] ? "profilesubmenu-wrap-clicked profilesubmenu-wrap profilesubmenu-arrow-wrap" : "profilesubmenu-wrap profilesubmenu-arrow-wrap"}>
        <Button onClick={handleProfileSubMenuButtonClicked} text="Offres formulées" style={isProfileSubMenuButtonClicked[2] ? ProfileSubMenuButtonStyle.stylingClicked : ProfileSubMenuButtonStyle.stylingNotClicked}/>
        <img src={Arrow} alt="Arrow bottom" />
      </div>
      <div className={isProfileSubMenuButtonClicked[3] ? "profilesubmenu-wrap-clicked profilesubmenu-wrap profilesubmenu-arrow-wrap" : "profilesubmenu-wrap profilesubmenu-arrow-wrap"}>
        <Button onClick={handleProfileSubMenuButtonClicked} text="Offres reçues" style={isProfileSubMenuButtonClicked[3] ? ProfileSubMenuButtonStyle.stylingClicked : ProfileSubMenuButtonStyle.stylingNotClicked}/>
        <img src={Arrow} alt="Arrow bottom" />
      </div>
    </div>
  );
};

export default ProfileSubMenu;

const ProfileSubMenuButtonStyle = {
  stylingNotClicked: {
    backgroundColor: "transparent",
    border: "none",
    height: "100%",
    fontFamily: 'Britanica-Heavy',
    fontSize: "20px",
    fontWeight: "400",
    opacity:"0.5"
  },
  stylingClicked: {
    backgroundColor: "transparent",
    border: "none",
    height: "100%",
    fontFamily: 'Britanica-Heavy',
    fontSize: "20px",
    fontWeight: "400",
    opacity:"1"
  },
  //   pseudoClasses:
  //     ".button-component:hover{border-bottom: 4px solid #F8DB4A !important}",
};
