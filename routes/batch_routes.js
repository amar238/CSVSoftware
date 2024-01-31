const express = require('express');
const router = express.Router();
const passport = require("passport");
const batchController = require('../controllers/batch_controller');

router.get('/list',passport.checkAuthentication,batchController.list);
router.post('/create',passport.checkAuthentication,batchController.create);
router.post('/update/:id',passport.checkAuthentication,batchController.update);
router.get('/delete/:id',passport.checkAuthentication,batchController.delete);
module.exports = router;