const nodeMailer = require('nodemailer');
const email = require('../config/email');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject("Failed to create access token :(");
      }
      resolve(token);
    });
  });

  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL,
      accessToken,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN
    }
  });

  return transporter;
};
module.exports = {
  /**
   * @description send email
   * @param {*} to type string - "bar@example.com, baz@example.com" list of receivers
   * @param {*} subject type string - Subject line
   * @param {*} type type string - "formcontact"
   * @param {*} content type OBJECT - content of email
   * 
   */
  sendEmail: async (to, subject, type, content, typeEmail) => {
    try {
      let emailTransporter = await createTransporter();
      let mailOptions = {
        to: to,
        subject: subject,
        html: email[type]({ email: to, tokenEmail : content.tokenEmail}, typeEmail)
      }
      await emailTransporter.sendMail(mailOptions);
      return { err: false, data:'mail sent' }
    } catch (error) {
      return { err: true, data: error }
    }
  },
  /**
   * @description send email dinos lo que quieres
   * @param {*} body
   */
  sendEmailSuggestion: async (body, file) => {
    try {
      let emailTransporter = await createTransporter();
      let mailOptions = {
        to: process.env.EMAIL,
        from: `"${body.email}" <from@example.com>`,
        subject: 'Dinos lo que quieres',
        text: body.message,
      }
      if (file) {
        mailOptions.attachments = [{
          filename: file.originalname,
          content: Buffer.from(file.buffer.toString('base64'),'base64')
        }]
      }
      await emailTransporter.sendMail(mailOptions);
      return { err: false, data:'mail sent' }
    } catch (error) {
      return { err: true, data: error }
    }
  }
}
