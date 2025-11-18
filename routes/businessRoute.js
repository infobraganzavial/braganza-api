const express = require('express');
const router = express.Router();
const businessController = require('../controllers/businessController');
const { authJwt } = require('../middleware/index');

router.get('/', businessController.findAll);
router.get('/:id', businessController.findOne);
router.post('/create', businessController.create);
router.put('/update/:id', businessController.update);
router.delete('/delete/:id', businessController.delete);

module.exports = router;
