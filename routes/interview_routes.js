const express = require('express');
const router = express.Router();
const passport = require('passport');
const interviewController = require('../controllers/interview_controller');

router.get('/list',passport.checkAuthentication,interviewController.list);
router.post('/create',passport.checkAuthentication,interviewController.create);
router.delete('/delete/:id',passport.checkAuthentication,interviewController.delete);
router.get('/allocate-interview/:id',passport.checkAuthentication,interviewController.allocateStudentPage);
router.post('/allocate-interview/:id',passport.checkAuthentication,interviewController.allocateStudent);
module.exports = router;