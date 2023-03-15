import React from "react";
import UtilitiesComponent from "../UtilitiesComponent/UtilitiesComponent";
import "./LaunchpadCollectionLiveUtilities.css";
import { v4 as uuidv4 } from "uuid";
function LaunchpadCollectionLiveUtilities() {
  const dataBackend = {
    utilities: [
      {
        title: "Meeting with Alexia",
        status: "Indisponible",
        description:
          "At the end of the Vendée Globe 2023, 15/400 of the holders of this NFT will have the chance to meet Alexia Barrier personally at the finish of the coursemaklemlakemazlkmalzkazemlkazemleakazlmekazelmaezkaz",
        date: "July 9th 2023",
      },
      {
        title: "3 online VIP live ",
        status: "Disponible",
        description:
          "Have access with all other members to 3 live important events during the entire competition, at three key times.",
        date: "July 9th / 15th / 28th 2023",
      },
      {
        title: "Alexia Barrier special merch",
        status: "Indisponible",
        description:
          "Receive your new collection t-shirt, signed by Alexia herself at the end of the race. The t-shirts will be sent 1 week after the end of the race.",
        date: "August 7th 2023",
      },
    ],
  };


  return (
    <section className="launchpad-collection-live-utilities-container">
   {dataBackend.utilities.map((element) => (
          <UtilitiesComponent
            key={uuidv4()}
            utilitiesTitle={element.title}
            utilitiesStatus={element.status}
            utilitiesDescription={element.description}
            utilitiesDate={element.date}
            launchpadCollectionLiveUtilities={true}
          />
        ))}
    </section>
  );
}

export default LaunchpadCollectionLiveUtilities;
