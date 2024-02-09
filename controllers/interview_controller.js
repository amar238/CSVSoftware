const Company = require('../models/company');
const Student = require('../models/student');
const CourseScores = require('../models/courseScores');
const Result = require('../models/result');

// fetch list of all interviews
module.exports.list = async(req,res)=>{
    try {
        const interviews = (await Company.find().populate({
            path:'students',
            populate:{
                path:'batch'
            }
        })).reverse();
        const course_scores = await CourseScores.find();
        var detailed_info =[]
        var detailed_object = {}
        for(interview_index in interviews){
            var studentScore = {}
            var newStudents = []
            for(student_index in interviews[interview_index].students){
                const scores = course_scores.find(score=> score.student.toString() === interviews[interview_index].students[student_index]._id.toString());
                studentScore = {
                    student:interviews[interview_index].students[student_index],
                    scores:scores
                }
                newStudents.push(studentScore);
                
            }       
            detailed_object={
                _id:interviews[interview_index]._id,
                name:interviews[interview_index].name,
                pos:interviews[interview_index].pos,
                interview_date:interviews[interview_index].interview_date,
                students:newStudents
            }
            detailed_info.push(detailed_object);
        }
        return res.render('interviews',{ interviews:detailed_info});
    } catch (error) {
        console.log("Interview List:- ",error);
    }
}

// create interview
module.exports.create = async(req,res)=>{
    try {
        const interview = await Company.findOne({name:req.body.name, pos:req.body.pos});
        if(!interview){
            console.log(req.body);
            const interview = await Company.create(req.body);
            return res.redirect('back'); 
        }else{
            console.log("Interview exist");
            return res.redirect('back');
        }
    } catch (error) {
        console.log("Creating Interview:- ",error);
        return res.redirect('back');
    }
}


module.exports.delete = async(req,res)=>{
    try {
        const interview = await Company.deleteOne({_id:req.params.id});
        await Result.deleteOne({company:req.params.id});
        return res.redirect('back');
    } catch (error) {
        console.log("Deleting Interview:- ",error);
        return res.redirect('back');
    }
}

// render interview page where list of eligible students along with scores is displayed
module.exports.allocateStudentPage = async(req,res)=>{
    try {
        const interview = await Company.findById(req.params.id);
        // fetch students who are not allocated to interview and has course scores
        const students = await CourseScores.find({student:{$nin:interview.students}}).populate({
            path:'student',
            populate:{
                path:'batch'
            }
        });
        // filter out placed students
        const eligibleStudents = students.filter(student=>{
            return student.student.status === 'Unplaced'
        });
        return res.render('allocate-interview',{interview,students:eligibleStudents});
    } catch (error) {
        console.log("Allocate Student Page:- ",error);
        return
    }
}

// allocate student for the interview
module.exports.allocateStudent = async(req,res)=>{
    try {
        const interview = await Company.findById(req.params.id);
        interview.students.push(req.body.studentId);
        interview.save();
        res.json({ success: true, message: 'Student updated successfully' });
    } catch (error) {
        console.error('Error allocating interview:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}