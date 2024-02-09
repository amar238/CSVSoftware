const express = require('express');
const router = express.Router();
const passport = require('passport');
const resultController = require('../controllers/result_controller');

router.get('/list-interviews',passport.checkAuthentication,resultController.interviews);
router.get('/interview/:id',passport.checkAuthentication,resultController.result);
router.post('/interview/add-result',passport.checkAuthentication,resultController.addResult);
module.exports = router;