const nodemailerService = require('../services/nodemailerService');
module.exports = {
    /**
     * @description send email user form contact
     * @param {*} req 
     * @param {*} res
     * @param {*} next
     */
    sendEmail: async (req, res, next) => {
        try {
            const body = req.body;
            const content = {
                name: body.name,
                email: body.email,
                subject: body.subject,
                message: body.message
            }
            const data = await nodemailerService.sendEmail(process.env.EMAIL, 'Información de usuario', 'formcontact', content, 'information');
            const data2 = await nodemailerService.sendEmail(content.email, 'Gracias por contactarnos', 'formcontact', content, 'user');
            res.status(201).json(data);
        } catch (error) {
            next(error);
        }
    },
}
