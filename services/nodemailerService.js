const nodeMailer = require("nodemailer");
const email = require("../config/email");

// Transporter SMTP (Gmail + App Password)
const createTransporter = async () => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  return transporter;
};

module.exports = {
  /**
   * @description send email
   * @param {string} to        - destinatario
   * @param {string} subject   - asunto
   * @param {string} type      - "confirm" | "formcontact"
   * @param {object} content   - datos del mail
   * @param {string} typeEmail - "information" | "user"
   */
  sendEmail: async (to, subject, type, content, typeEmail) => {
    try {
      const emailTransporter = await createTransporter();

      const fullContent = {
        ...content,
        email: content.email || to,
      };

      const html = email[type](fullContent, typeEmail);

      const mailOptions = {
        from: `"Braganza Vial" <${process.env.EMAIL}>`,
        to,
        subject,
        html,
      };

      const info = await emailTransporter.sendMail(mailOptions);
      console.log("Email sent:", info.messageId);

      return { err: false, data: "mail sent" };
    } catch (error) {
      console.error("Error sending email:", error);
      return { err: true, data: error.message || error };
    }
  },

  sendEmailSuggestion: async (body, file) => {
    try {
      const emailTransporter = await createTransporter();

      const mailOptions = {
        to: process.env.EMAIL,
        from: `"${body.email}" <${process.env.EMAIL}>`,
        replyTo: body.email,
        subject: "Dinos lo que quieres",
        text: body.message,
      };

      if (file) {
        mailOptions.attachments = [
          {
            filename: file.originalname,
            content: Buffer.from(file.buffer.toString("base64"), "base64"),
          },
        ];
      }

      await emailTransporter.sendMail(mailOptions);
      return { err: false, data: "mail sent" };
    } catch (error) {
      console.error("Error sending suggestion email:", error);
      return { err: true, data: error.message || error };
    }
  },
};
