const express = require('express');
const router = express.Router();
const formContacts = require('../helpers/formContacts');

router.post('/send-email', formContacts.sendEmail);
module.exports = router;
