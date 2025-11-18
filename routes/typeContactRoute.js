const express = require('express');
const router = express.Router();
const typeContactController = require('../controllers/typeContactController');
const { authJwt } = require('../middleware/index');

router.get('/', typeContactController.findAll);
router.get('/:id', typeContactController.findOne);
router.post('/create', typeContactController.create);
router.put('/update/:id', typeContactController.update);
router.delete('/delete/:id', typeContactController.delete);

module.exports = router;
