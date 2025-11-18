const express = require('express');
const router = express.Router();
const componentController = require('../controllers/componentController');
const { authJwt } = require('../middleware/index');

router.get('/', componentController.findAll);
router.get('/:id', componentController.findOne);
router.post('/create', componentController.create);
router.put('/update/:id', componentController.update);
router.delete('/delete/:id', componentController.delete);

module.exports = router;
