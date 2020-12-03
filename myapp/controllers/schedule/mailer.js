const mail = require('nodemailer');
const senderEmailAddress = process.env.EMAILADRESS;
const senderEmailPassword = process.env.EMAILPASSWORD;
const sendMail = function (title, text, receiveEmailAddress) {
  const transporter = mail.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // SSL
    auth: {
      user: senderEmailAddress,
      pass: senderEmailPassword
    }
  });
  var mailOptions1 = {
    from: senderEmailAddress,
    to: receiveEmailAddress,
    subject: title,
    text: text
  };
  transporter.sendMail(mailOptions1, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
module.exports = {
  sendMail,
}