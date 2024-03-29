const express = require('express');
const router = express.Router();
const passport = require('passport');
const homeController = require('../controllers/home_controller');

// student details routes
router.get('/',homeController.home);
router.post('/create',passport.checkAuthentication,homeController.create);
router.put('/update/:id',passport.checkAuthentication,homeController.update);
router.delete('/delete/:id',passport.checkAuthentication,homeController.delete);
//subroutes
router.use('/emp',require('./employee_routes'));
router.use('/batch',require('./batch_routes'));
router.use('/course-scores',require('./course_scores_routes'));
router.use('/interview',require('./interview_routes'));
router.use('/result',require('./result_routes'));
router.use('/csv',require('./csv_routes'));

module.exports = router;
