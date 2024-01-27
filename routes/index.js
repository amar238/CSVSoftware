const express = require('express')
const router = express.Router();
const homeController = require('../controllers/home_controller');

router.get('/',homeController.home);

router.use('/emp',require('./employee_routes'));

module.exports = router;
