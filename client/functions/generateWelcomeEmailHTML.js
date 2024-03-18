const generateWelcomeEmailHTML = () => {
  return `
<!DOCTYPE html>
<html lang="fr">
 <head>
  <meta charset="utf-8"/>
  <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
  <title>
   Bienvenue chez Sofan
  </title>
 </head>
 <body style="background-color: white; color: #333; font-family: Arial, sans-serif; padding: 20px;">
  <div style="max-width: 500px; margin: 0 auto; padding: 20px; background-color: #f6f6f6; border-radius: 5px;">
   <div style="text-align: center; margin-bottom: 20px;">
    <img alt="Sofan Logo" src="https://firebasestorage.googleapis.com/v0/b/sofan-app.appspot.com/o/sofanlogo.svg?alt=media&amp;token=00ba642b-8d9e-4010-b831-19413e0a2dea" style="width: 150px; border-radius: 5px;"/>
   </div>
   <div style="margin: 20px 0; font-size: 18px;">
    Bonjour et bienvenue chez Sofan! Rejoignez la communauté passionnée de sports, d'athlètes et de NFTs.
   </div>
   <div>
       <img alt="Image of sports or athletes" src="https://firebasestorage.googleapis.com/v0/b/sofan-app.appspot.com/o/assets%2Fmbappe.png?alt=media&amp;token=82bfc7c6-dd43-4e94-bdb8-16352cda59b8" style="display: block; margin: 0 auto; max-width: 100%; max-height: 400px; border-radius: 5px;"/>
       <div style="text-align: center; position: relative; top: -60px; font-size: 18px; font-weight: bold; color: #dbb63d;">
        Rejoignez le parcours <br> des athlètes
       </div>
    </div>
   <a href="https://www.sofan.app" style="display: block; width: 200px; margin: 20px auto; padding: 10px; background-color: #f6d463; color: white; text-align: center; border-radius: 5px; text-decoration: none; font-weight: bold;">
    Ouvrez le site
   </a>
   <div style="text-align: center; color: #888; font-size: 14px; margin-top: 20px;">
    Si vous avez des questions sur les sports, les athlètes ou les NFTs, n'hésitez pas à nous contacter à
    <a href="mailto:contact@sofan.app" style="color: blue;">
     contact@sofan.app
    </a>
   </div>
  </div>
 </body>
</html>
`;
};

module.exports = generateWelcomeEmailHTML;
