const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee_controller');


router.get('/sign_up',employeeController.singUp);
router.post('/create',employeeController.create);

module.exports = router;