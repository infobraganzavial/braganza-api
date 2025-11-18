const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authJwt } = require('../middleware/index');

router.get('/', [authJwt.verifyToken], userController.findAll);
router.get('/:id', userController.findOne);
router.post('/create', userController.create);
router.put('/update/:id', userController.update);
router.delete('/delete/:id', userController.delete);

module.exports = router;
