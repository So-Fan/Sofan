const functions = require("firebase-functions/v1");
const cors = require('cors')({ origin: ['http://localhost:3000', 'https://www.sofan.app', 'https://staging.sofan.app'] });
//.const cors = require('cors')({ origin: true });

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started

const nodemailer = require("nodemailer");
//const generateVerificationCodeEmailHTML = require("./generateVerificationCodeEmailHTML");

const transporter = nodemailer.createTransport({
  host: "mail.gandi.net",
  port: 465,
  secure: true,
  auth: {
    user: functions.config().email.user, // Adjusted to use Firebase functions config
    pass: functions.config().email.pass, // Adjusted to use Firebase functions config
  },
});

// functions.logger.log(functions.config().email.user);

exports.sendVerificationEmail = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    // Your function code here
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }
  
    const { email, verificationCode } = req.body; // Extracting email and code from request
    const htmlContent = generateVerificationCodeEmailHTML({
      code: verificationCode,
    });
  
    const mailOptions = {
      from: functions.config().email.user, // Adjusted to use Firebase functions config
      to: email,
      subject: "Sign Up Verification Code",
      html: htmlContent,
    };

    try {
      await transporter.sendMail(mailOptions);
      functions.logger.log("Email sent successfully");
    } catch (err) {
      functions.logger.error("Error sending email:", err);
    }
    
    //res.send('CORS enabled!');
  });
  
});
