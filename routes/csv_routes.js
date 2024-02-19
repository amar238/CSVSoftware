const express = require('express');
const router = express.Router();
const passport = require('passport');
const csvController = require('../controllers/csv_controller');

router.get('/data',passport.checkAuthentication,csvController.getData);
router.get('/download',passport.checkAuthentication,csvController.download);
module.exports = router;