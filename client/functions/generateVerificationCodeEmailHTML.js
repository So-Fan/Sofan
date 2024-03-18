
const generateVerificationCodeEmailHTML = ({ code }) => {
  const bodyStyle = "font-family: Arial, sans-serif; background-color: #fafafa; margin: 0; padding: 0; line-height: 1.6;";
  const containerStyle = "max-width: 600px; margin: 0 auto; padding: 20px; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); background-color: #ffffff; box-sizing: border-box;";
  const logoStyle = "text-align: center; margin-bottom: 30px;";
  const logoImageStyle = "max-width: 150px;";
  const verificationCodeStyle = "padding: 30px; background-color: #f6d463; color: #000000; text-align: center; font-size: 24px; font-weight: bold; margin-bottom: 30px; border-radius: 5px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);";
  const welcomeMessageStyle = "text-align: center; font-size: 20px; margin-bottom: 20px;";
  const footerStyle = "margin-top: 30px; text-align: center; color: #888888;";

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Sofan Verification Code</title>
      </head>
      <body style="${bodyStyle}">
        <div style="${containerStyle}">
          <div style="${logoStyle}">
            <img src="https://www.sofan.app/static/media/sofanlogo.0ebbca7be5c3d47afa2134b5079fe2b8.svg" alt="Logo Sofan" style="${logoImageStyle}" />
          </div>
          <div style="${verificationCodeStyle}">
            <p>Vérifiez votre compte</p>
            <p>Code de vérification : <strong>${code}</strong></p>
          </div>
          <div style="${welcomeMessageStyle}">
            <p>Bienvenue sur Sofan !</p>
            <p>Achetez des NFT exclusifs de vos athlètes préférés et rejoignez notre communauté.</p>
            <p>Préparez-vous à vivre une expérience unique.</p>
          </div>
          <div style="${footerStyle}">
            <p>Si vous avez besoin d'aide, n'hésitez pas à contacter notre équipe de support dédiée à <a href="mailto:contact@sofan.app">contact@sofan.app</a>.</p>
            <p>Merci d'avoir choisi Sofan! Nous sommes impatients de vous servir.</p>
          </div>
        </div>
      </body>
    </html>
  `;
};

module.exports = generateVerificationCodeEmailHTML;


