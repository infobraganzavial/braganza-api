const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailerService = require('../services/nodemailerService');
const SequelizeService = require('../services/sequelizeService');
const { User } = require('../models')
const service = new SequelizeService(User);
const { Op } = require('sequelize');
const config = require('../config/authConfig');

module.exports = {
    /**
     * @description Create and Save User
     * @param {*} req
     * @param {*} res
     */
    signup: async (req, res) => {
        try {
            // TODO: Validar datos requeridos
            let body = req.body;
            let tokenEmail = '';
            crypto.randomBytes(20, async (err, buf) => {
                tokenEmail = buf.toString('hex')
                const send = await nodemailerService.sendEmail(body.email, 'confirmar email', 'confirm', { tokenEmail })
                if (send.err) {
                    res.status(500).json({ data: send.data, err: true });
                } else {
                    body.password = bcrypt.hashSync(body.password, 8);
                    const user = await User.create({...body, tokenEmail});
                    res.status(200).send({ data: { token: tokenEmail }, err: false });
                }
            });
        } catch (err) {
            if (errSql[err.name]) res.status(400).json({ data: { name: err.name, errors: err.errors }, err: true });
            else res.status(500).json({ data: err, err: true });
        }
    },
    /**
     * @description log in
     * @param {*} req 
     * @param {*} res 
     */
    signin: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await service.findOne({ where: { [Op.or]: [ { username: email }, { email } ] }, raw: true });
            if (!user) return res.status(404).send({ data: 'Usuario no encontrado.', err: true });
            
            const passwordIsValid = bcrypt.compareSync(password, user.password);
            if (!passwordIsValid) return res.status(401).send({ data: 'Contraseña invalida', err: true });
            const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: 86400 }); // 24 hours
            delete user.password;
            res.status(200).send({ accessToken: token, user: user, expiresIn: 86400, err: false });  
        } catch (err) {
            next(err);
        }
    },
    /**
     * @description confirm mail and login
     * @param {*} req 
     * @param {*} res 
     */
    confirmEmail: async (req, res) => {
        try {
            const { token } = req.params;
            const attributes = { exclude: ['password', 'token',  'tokenEmail'] };
            const user = await User.findOne({ attributes, where: { tokenEmail: token } });
            if (!user) return res.status(404).send({ data: 'Usuario no encontrado.', err: true });
        
            if (user.confirmEmail) return res.status(400).send({ data: 'Correo electrónico ya está confirmado', err: true });
            const accessToken = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 }); // 24 hours
            user.confirmEmail = true;
            user.token = accessToken;
            user.save();

            res.status(200).send({ accessToken, user, err: false });
        } catch (err) {
            res.status(500).json({ data: err, err: true });
        }
    },
    /**
     * @description confirm mail and send link
     * @param {*} req 
     * @param {*} res 
     */
    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body;
            const user = await User.findOne({ where: { email } });
            if (!user) return res.status(404).send({ data: 'Correo electrónico no encontrado.', err: true });
            crypto.randomBytes(20, async (err, buf) => {
                const tokenEmail = buf.toString('hex')
                const send = await nodemailerService.sendEmail(email, 'Restablecer contraseña', 'forgot', { tokenEmail })
                if (send.err) {
                    res.status(500).json({ data: send.data, err: true });
                } else {
                    user.tokenEmail = tokenEmail;
                    await user.save();
                    console.log('send', send);
                    res.status(200).send({ data: { token: tokenEmail }, err: false });
                }
            });

        } catch (err) {
            res.status(500).json({ data: err, err: true });
        }
    },
    /**
     * @description reset mapasword
     * @param {*} req 
     * @param {*} res 
     */
     resetPassword: async (req, res) => {
        try {
            const { token } = req.params;
            const { password } = req.body;
            const user = await User.findOne({ where: { tokenEmail: token } });
            if (!user) return res.status(404).send({ data: 'token Not found.', err: true });
            user.password = bcrypt.hashSync(password, 8);
            await user.save();
            res.status(200).send({ data: 'password reseted', err: false });
        } catch (err) {
            res.status(500).json({ data: err, err: true });
        }
    }
}
