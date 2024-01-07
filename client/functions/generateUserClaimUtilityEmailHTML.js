const generateUserClaimUtilityEmailHTML = ({
  display_name,
  nftId,
  athleteName,
  claimed_date,
  collectionName,
  title,
  description,
  utility_date,
}) => {

  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="utf-8"/>
      <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
      <title>Confirmation de Réclamation NFT</title>
    </head>
    <body style="background-color: white; color: #333; font-family: Arial, sans-serif; padding: 20px;">
      <div style="max-width: 500px; margin: 0 auto; padding: 20px; background-color: #f6f6f6; border-radius: 5px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://firebasestorage.googleapis.com/v0/b/sofan-app.appspot.com/o/sofanlogo.svg?alt=media&token=00ba642b-8d9e-4010-b831-19413e0a2dea" alt="Sofan Logo" style="width: 150px;"/>
        </div>
        <div style="margin: 20px 0; font-size: 18px;">
          Bonjour ${display_name},
          <br><br>
          Nous sommes heureux de vous confirmer que vous avez réussi à réclamer une utilité NFT pour ${collectionName}.
          <br><br>
          Détails de l'utilité réclamée:
          <ul>
            <li>ID de NFT: ${nftId}</li>
            <li>Nom de l'athlète: ${athleteName}</li>
            <li>Date de réclamation: ${claimed_date}</li>
          </ul>
          <div style="margin-top: 20px; padding: 10px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
            <h3 style="color: #333;">Détails de l'Utilité</h3>
            <p><strong>Titre:</strong> ${title}</p>
            <p><strong>Description:</strong> ${description}</p>
            <p><strong>Date de l'Utilité:</strong> ${utility_date}</p>
          </div>
          Vous pouvez vérifier l'état de votre utilité NFT à tout moment dans votre tableau de bord utilisateur.
        </div>
        <a href="https://sofan.app" style="display: block; width: 200px; margin: 20px auto; padding: 10px; background-color: #f6d463; color: white; text-align: center; border-radius: 5px; text-decoration: none; font-weight: bold;">Voir Mon Profile</a>
        <div style="text-align: center; color: #888; font-size: 14px; margin-top: 20px;">
          Si vous avez des questions ou besoin d'assistance, n'hésitez pas à nous contacter à <a href="mailto:contact@sofan.app" style="color: blue;">contact@sofan.app</a>.
        </div>
      </div>
    </body>
    </html>
  `;
};

module.exports = generateUserClaimUtilityEmailHTML;
