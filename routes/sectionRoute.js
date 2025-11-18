const express = require('express');
const router = express.Router();
const sectionController = require('../controllers/sectionController');
const { authJwt } = require('../middleware/index');

router.get('/', sectionController.findAll);
router.get('/:id', sectionController.findOne);
router.post('/create', sectionController.create);
router.put('/update/:id', sectionController.update);
router.delete('/delete/:id', sectionController.delete);

module.exports = router;
