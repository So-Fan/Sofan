const functions = require("firebase-functions/v1");
//const cors = require('cors')({ origin: ['http://localhost:3000', 'https://www.sofan.app', 'https://staging.sofan.app'] });
const cors = require('cors')({ origin: true });

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started

const nodemailer = require("nodemailer");
const generateVerificationCodeEmailHTML = require("./generateVerificationCodeEmailHTML");
const generateWelcomeEmailHTML = require("./generateWelcomeEmailHTML");

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
   // Return 204 for OPTIONS method (preflight request)
  
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    const { email, verificationCode } = req.body;
    const htmlContent = generateVerificationCodeEmailHTML({
      code: verificationCode,
    });

    const mailOptions = {
      from: `"Sofan" <${functions.config().email.user}>`,
      to: email,
      subject: "Sign Up Verification Code",
      html: htmlContent,
    };

    try {
      await transporter.sendMail(mailOptions);
      functions.logger.log("Email sent successfully");
      res.send({ success: "Email sent successfully" }); // Send success response
    } catch (err) {
      functions.logger.error("Error sending email:", err);
      res.status(500).send({ error: "Error sending email", details: err }); // Send error details
    }
  });
});


exports.sendWelcomeEmail = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    const htmlContent = generateWelcomeEmailHTML();
    const { emailAddress } = req.body;
    const mailOptions = {
      from: `"Sofan" <${functions.config().email.user}>`,
      to: emailAddress,
      subject: "Bienvenue à Sofan",
      html: htmlContent,
    };

    try {
      await transporter.sendMail(mailOptions);
      functions.logger.log("Email sent successfully");
      res.send({ success: "Email sent successfully" }); // Send success response
    } catch (err) {
      functions.logger.error("Error sending email:", err);
      res.status(500).send({ error: "Error sending email", details: err }); // Send error details
    }
  });
});



const admin = require('firebase-admin');
//const functions = require('firebase-functions');
admin.initializeApp();

exports.scheduledPublish = functions.pubsub.schedule('every 60 minutes').onRun(async (context) => {
  const now = admin.firestore.Timestamp.now();
  const scheduledPostsRef = admin.firestore().collection('scheduled_posts');
  const feedPostsRef = admin.firestore().collection('feed_post');

  console.log('Checking for scheduled posts to publish...');

  const snapshot = await scheduledPostsRef.where('publish_timestamp', '<=', now).get();

  if (snapshot.empty) {
    console.log('No posts to publish.');
    return null;
  }

  const batch = admin.firestore().batch();

  snapshot.docs.forEach((doc) => {
    const postData = doc.data();
    postData.createdAt = now; // Update the createdAt value to the current timestamp
    const newPostRef = feedPostsRef.doc();
    
    batch.set(newPostRef, postData);
    batch.delete(doc.ref);
  });

  return batch.commit().then(() => {
    console.log('Posts published successfully!');
    return null;
  });
});


