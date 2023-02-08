import React from "react";
import "./DropDownMenu.css";
function DropDownMenu() {
  return (
    <>
      <section className="dropdown-menu-container">
        <ul>
          <a href="">
            <li>Supprimer</li>
          </a>
          <div className="separation-line-dropdown-menu"></div>
          <a href="">
            <li>Copier le lien</li>
          </a>
          <div className="separation-line-dropdown-menu"></div>
          <a href="">
            <li>Voir le profil</li>
          </a>
        </ul>
      </section>
    </>
  );
}

export default DropDownMenu;
