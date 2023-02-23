import React, { useState } from "react";
import "./SortBySelector.css";
import Arrow from "../../Assets/Image/arrow_bottom.svg";
const SortBySelector = ({
  setIsUSerProfileSeortBySelectorClicked,
  isUSerProfileSeortBySelectorClicked,
}) => {
  const [currentProfileSortSelectorSelected, setCurrentProfileSortSelectorSelected] = useState("Plus récent")
  const handleUserProfileSortBySelector = () => {
    setIsUSerProfileSeortBySelectorClicked(true);
  };
  const handleSortBySelectorChoiceClicked = e => {
    console.log(e);
    setCurrentProfileSortSelectorSelected(e.target.innerHTML)
  }
  return (
    <div
      onClick={handleUserProfileSortBySelector}
      id="sortbyselector-component"
    >
      <span style={isUSerProfileSeortBySelectorClicked === true ? {fontFamily: 'Britanica-Heavy'} : {}} id="sortbyselector-span" >{currentProfileSortSelectorSelected}</span>
      <img id="sortbyselector-img"  src={Arrow} alt="arrow bottom" />
      {isUSerProfileSeortBySelectorClicked && (
        <>
          <div className="sortbyselector-menu">
            <ul>
              {currentProfileSortSelectorSelected !== "Date" && <li onClick={handleSortBySelectorChoiceClicked}>Date</li>}
              {currentProfileSortSelectorSelected !== "Prix" && <li onClick={handleSortBySelectorChoiceClicked}>Prix</li>}
              {currentProfileSortSelectorSelected !== "Sportif" && <li onClick={handleSortBySelectorChoiceClicked}>Sportif</li>}
              {currentProfileSortSelectorSelected !== "Plus récent" && <li onClick={handleSortBySelectorChoiceClicked}>Plus récent</li>}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default SortBySelector;
