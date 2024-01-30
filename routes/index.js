const express = require('express');
const router = express.Router();
const passport = require('passport');
const homeController = require('../controllers/home_controller');

router.get('/',homeController.home);
// router.get('/',passport.checkAuthentication,homeController.home);
router.use('/emp',require('./employee_routes'));

module.exports = router;
