const sgMail = require("@sendgrid/mail");
const emailTemplates = require("../config/email");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * @param {object} options
 * @param {string} options.to
 * @param {string} options.subject
 * @param {string} options.html
 */
async function sendViaSendGrid({ to, subject, html }) {
  const msg = {
    to,
    from: process.env.EMAIL_FROM || process.env.EMAIL,
    subject,
    html,
  };

  const [response] = await sgMail.send(msg);
  return {
    statusCode: response.statusCode,
    headers: response.headers,
  };
}

module.exports = {
  /**
   * @description send email genérico
   * @param {string} to        - destinatario
   * @param {string} subject   - asunto
   * @param {string} type      - "confirm" | "formcontact"
   * @param {object} content   - datos del mail
   * @param {string} typeEmail - "information" | "user"
   */
  sendEmail: async (to, subject, type, content, typeEmail) => {
    try {
      const fullContent = {
        ...content,
        email: content.email || to,
      };

      const html = emailTemplates[type](fullContent, typeEmail);

      const data = await sendViaSendGrid({ to, subject, html });

      return { err: false, data };
    } catch (error) {
      console.error("Error sending email:", error);
      return { err: true, data: error.message || error };
    }
  },

  /**
   * @description send email "Dinos lo que quieres"
   * @param {*} body
   * @param {*} file (por ahora sin adjuntos, se puede agregar luego)
   */
  sendEmailSuggestion: async (body, file) => {
    try {
      const html = `
        <p>Mensaje desde el formulario "Dinos lo que quieres":</p>
        <p><strong>De:</strong> ${body.email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${body.message}</p>
      `;

      const msg = {
        to: process.env.EMAIL,
        from: process.env.EMAIL_FROM || process.env.EMAIL,
        replyTo: body.email,
        subject: "Dinos lo que quieres",
        html,
      };

      const [response] = await sgMail.send(msg);

      return {
        err: false,
        data: {
          statusCode: response.statusCode,
          headers: response.headers,
        },
      };
    } catch (error) {
      console.error("Error sending suggestion email:", error);
      return { err: true, data: error.message || error };
    }
  },
};
