const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');
const { authJwt } = require('../middleware/index');

router.get('/', pageController.findAll);
router.get('/:id', pageController.findOne);
router.post('/create', pageController.create);
router.put('/update/:id', pageController.update);
router.delete('/delete/:id', pageController.delete);

module.exports = router;
