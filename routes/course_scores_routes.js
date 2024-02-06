const express = require('express');
const router = express.Router();
const passport = require('passport');
const courseScoresController = require('../controllers/course_scores_controller');

router.get('/student/:id',passport.checkAuthentication,courseScoresController.studentPage);
router.post('/add-scores/:id',passport.checkAuthentication,courseScoresController.addScores);
router.get('/stats',passport.checkAuthentication,courseScoresController.stats);
router.put('/update/:id',passport.checkAuthentication,courseScoresController.update);
router.delete('/delete/:id',passport.checkAuthentication,courseScoresController.delete);
module.exports = router;