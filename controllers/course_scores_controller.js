const Student =  require('../models/student');
const CourseScore = require('../models/courseScores');
const Batch = require('../models/batch');
const Interview = require('../models/company');
const Result = require('../models/result');
const customFunctions = require('../customFunctions');



// student profile
module.exports.studentPage = async(req,res)=>{
    
    try {      
        const student = await Student.findOne({_id:req.params.id}).populate('batch');
        return res.render('student',{student});
    } catch (error) {
        console.log("Studnet Page sadasdasdsadad:- ",error);
        return;
    }
}

// add course scores
module.exports.addScores = async(req,res)=>{
    try {
        studentScores = await CourseScore.find({student:req.params.id});
        if(studentScores.length == 0){
            await CourseScore.create({
                student:req.params.id,
                dsa: req.body.dsa,
                webD: req.body.webD,
                react: req.body.react
            });
            return res.redirect('/course-scores/stats');
        }else{
            console.log("Scores Already Exist");
            return res.redirect('back');
        }
    } catch (error) {
        console.log("Course Score add:- ",error);
        return;
    }
}
//  display course stats
module.exports.stats = async(req,res)=>{
    try {
        studentsStats = await CourseScore.find().populate({
            path:'student',
            populate:{
                path:'batch'
            }
        });
        return res.render('course_score_stats',{studentsStats});
    } catch (error) {
        console.log("Course Score Stats:- ",error);
        return res.redirect('back');
    }
}

// update course scores
module.exports.update =async(req,res)=>{
    try {
        var stats;
        console.log(req.body)
        if(req.body.dsa ==='' || req.body.webD==='' || req.body.react === '' ||parseInt(req.body.dsa)<0 || parseInt(req.body.webD)<0  ||parseInt(req.body.react)<0 ||parseInt(req.body.dsa)>100 || parseInt(req.body.webD)>100  ||parseInt(req.body.react)>100 ){
            return res.redirect('back');
        }else{
            stats = await CourseScore.findByIdAndUpdate(req.params.id,req.body,{new:true});
        }
        if (!stats) {
            return res.status(404).json({ success: false, message: 'Stats not found' });
          }
          res.status(200).json({ success: true, message: 'Stats updated successfully', stats });
    } catch (error) {
        console.error('Error updating student:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

//  delete course scores and dependency with it
module.exports.delete = async(req,res)=>{
    try {
        const stats = await CourseScore.findOne({_id:req.params.id});
        student = await Student.findById(stats.student);
        await Interview.updateMany({$pull:{students:stats.student}});
        await Result.deleteOne({student:stats.student});
        await CourseScore.deleteOne({_id:req.params.id});
        if (!stats) {
                return res.status(404).json({ success: false, message: 'Stats not found' });
            }
            //  returns student id of whose course scores has been deleted 
            res.json({ success: true, message: 'Stats deleted successfully along with student info from Interview and Result', student });
    } catch (error) {
        console.error('Error deleting stats:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}