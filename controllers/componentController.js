const SequelizeService = require('../services/sequelizeService');
const { Component } = require('../models');
const service = new SequelizeService(Component);
module.exports = {
    /**
     * @description Create and Save components
     * @param {*} req 
     * @param {*} res 
     */
    create: async (req, res) => {
        try {
            let body = req.body;
            const newDoc = await service.create(body);
            res.status(201).json(newDoc);
        } catch (error) {
            next(error);
        }
    },
    /**
     * @description Retrieve all the rows of the components
     * @param {*} req 
     * @param {*} res 
     */
    findAll: async (req, res) => {
        try {
            const components = await service.findAll();
            res.status(200).json(components);
        } catch (error) {
            next(error);
        }
    },
    /**
     * @description Find a single row
     * @param {*} req 
     * @param {*} res 
     */
    findOne: async (req, res) => {
        try {
            const { id } = req.params;
            const component = await service.findOne({ where: { id } });
            res.status(200).json(component);
        } catch (error) {
            next(error);
        }
    },
    /**
     * @description Update a row by the id in the request
     * @param {*} req 
     * @param {*} res 
     */
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const component = await service.update(id, body);
            res.status(204).json(component);
        } catch (error) {
            next(error);
        }
    },
    /**
     * @description Delete a row with the specified id in the request
     * @param {*} req 
     * @param {*} res 
     */
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const deleted = await service.delete(id);
            res.status(204).status(201).json({ deleted });
        } catch (error) {
            next(error);
        }
    },
    /**
     * @description Delete all rows from the model.
     * @param {*} req 
     * @param {*} res 
     */
    deleteAll: (req, res) => {
      
    },
}
