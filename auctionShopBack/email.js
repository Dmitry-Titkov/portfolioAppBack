// gX5%0SbRe7Af
// auctionsystemportfolio@gmail.com

const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "auctionsystemportfolio@gmail.com",
    pass: "gX5%0SbRe7Af", // naturally, replace both with your real credentials or an application-specific password
  },
});

function sendEmail(email) {
  const mailOptions = {
    from: "auctionsystemportfolio@gmail.com",
    to: email,
    subject: "Welcome to the auction app",
    text: "Thank you for registering",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = { sendEmail };
