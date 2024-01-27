const express = require('express');
const router = express.Router();
const passport = require("passport");
const employeeController = require('../controllers/employee_controller');

// sign up routes
router.get('/sign-up',employeeController.singUp);
router.post('/create',employeeController.create);

// sign in
router.get('/sign-in',employeeController.singIn);
router.post('/create-session',passport.authenticate("local", { failureRedirect: "/emp/sign-in" }),employeeController.createSession);

// sign out
router.get('/sign-out',employeeController.destroySession); 

module.exports = router;