import React from "react";
import "./DropDownMenu.css";

function DropDownMenu() {

  // Backend here
  const isOwner = true;

  return (
    <>
      <section className="dropdown-menu-container">
        <ul>
          {isOwner && (
            <>
              <a href="/" id="link-dropdown-menu">
                <li>Supprimer</li>
              </a>
              <div className="separation-line-dropdown-menu"></div>
              <a href="/" id="link-dropdown-menu">
                <li>Modifier la publication</li>
              </a>
              <div className="separation-line-dropdown-menu"></div>
            </>
          )}
          <a href="/" id="link-dropdown-menu">
            <li>Copier le lien</li>
          </a>
          <div className="separation-line-dropdown-menu"></div>
          <a href="/" id="link-dropdown-menu">
            <li>Voir le profil</li>
          </a>
        </ul>
      </section>
    </>
  );
}

export default DropDownMenu;
