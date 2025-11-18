const SequelizeService = require('../services/sequelizeService');
const { User, Rol, Business } = require('../models')
const service = new SequelizeService(User);
const bcrypt = require('bcryptjs');
module.exports = {
    /**
     * @description Create and Save Article
     * @param {*} req 
     * @param {*} res
     * @param {*} next
     */
    create: async (req, res, next) => {
        try {
            let body = req.body;
            console.log(body.password)
            body.password = bcrypt.hashSync(body.password, 8);
            const newDoc = await service.create(body);
            res.status(201).json(newDoc);
        } catch (error) {
            next(error);
        }
    },
    /**
     * @description Retrieve all the rows of the Articles
     * @param {*} req
     * @param {*} res 
     */
    findAll: async (req, res, next) => {
        try {
            const options = {
                include: [{
                    model: Rol
                },
                {
                    model: Business
                }]
            };
            const docs = await service.findAll(options);
            res.status(200).json(docs);
        } catch (error) {
            next(error);
        }
    },
    /**
     * @description Find a single row
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    findOne: async (req, res, next) => {
        try {
            const { id } = req.params;
            const doc = await service.findOne({ where: { id } });
            res.status(200).json(doc);
        } catch (error) {
            next(error);
        }
    },
    /**
     * @description Update a row by the id in the request
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    update: async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const doc = await service.update(id, body);
            res.status(204).json(doc);
        } catch (error) {
            next(error);
        }
    },
    /**
     * @description Delete a row with the specified id in the request
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    delete: async (req, res, next) => {
        try {
            const { id } = req.params;
            const delted = await service.delete(id);
            res.status(204).status(201).json({ delted });
        } catch (error) {
            next(error);
        }
    },
    /**
     * @description Delete all rows from the model.
     * @param {*} req 
     * @param {*} res 
     */
    deleteAll: async (req, res, next) => {
      
    },
}
