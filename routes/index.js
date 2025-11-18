const express = require('express');
const router = express.Router();
const userRoute = require('./userRoute');
const businessRoute = require('./businessRoute');
const typeContactRoute = require('./typeContactRoute');
const pageRoute = require('./pageRoute');
const sectionRoute = require('./sectionRoute');
const componentRoute = require('./componentRoute');
const formContactRoute = require('./formContactRoute');
const authRoute = require('./authRoute');

module.exports = (app) => {
  app.use('/api/v1', router);
  router.use('/user', userRoute);
  router.use('/form-contact', formContactRoute);
  router.use('/auth', authRoute);
  router.use('/business', businessRoute);
  router.use('/typeContact', typeContactRoute);
  router.use('/page', pageRoute);
  router.use('/section', sectionRoute);
  router.use('/component', componentRoute);
};