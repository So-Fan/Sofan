import React from "react";
import "./LegalsMentions.css";

function LegalsMentions() {
  return (
    <div className="legals-mentions-page-container">
      <div className="legals-mentions-page-title">Mentions Légales</div>
      <div className="legals-mentions-page-company-registration">
        Le Site www.sofan.app est une publication de la société : SoFan, SAS, au
        capital de 1 000€, enregistrée auprès de la Préfecture de Lille
        Métropole sous le siret 92227287700015, dont le siège social est situé
        au 125, Bois d’Achelles, 59200 Tourcoing, représentée par son Président
        habilité aux fins des présentes
      </div>
      <div className="legals-mentions-page-contact">
        <div>Contact: </div> contact@sofan.io
      </div>
      <div className="legals-mentions-page-publication-director">
        <div>Directeur de la publication :</div>
        Grégoire de la LANDE d’OLCE
      </div>
      <div className="legals-mentions-page-hosting">
        <div>Hébergeur :</div>
        Nom de l'entreprise: Google LLC Adresse: 1600 Amphitheatre Parkway,
        Mountain View, CA 94043, USA Numéro de téléphone: +1 650-253-0000 Site
        Web: https://firebase.google.com/
      </div>
    </div>
  );
}

export default LegalsMentions;
