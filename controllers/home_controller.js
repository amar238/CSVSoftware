const Student =  require('../models/student');
const Batch = require('../models/batch');
const CourseScore= require('../models/courseScores');
const Interview = require('../models/company');
const Result = require('../models/result');
const customFunctions = require('../customFunctions');

// student_list 
module.exports.home = async(req,res)=>{
    try {
        const batches = (await Batch.find()).slice().sort(customFunctions.sortBatches).reverse();
        const students = (await Student.find().populate('batch')).reverse();
        return res.render('home',{batches,students});
    } catch (error) {
        console.log("Student Details(home):- ",error);
        return;
    }
}

// add student
module.exports.create = async(req,res)=>{
    try {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        var validatedEmail;
        var student; 
        if(emailPattern.test(req.body.email)){
            validatedEmail = emailPattern.test(req.body.email);
            student = await Student.findOne({email: validatedEmail});
        }else{
            console.log("Error in validating email");
             return res.redirect('/');
        }
        if(!student){
            await Student.create(req.body);
            res.redirect('/');
        }
        else{
            console.log("Student already exist");
            return res.redirect('back');
        }
    } catch (error) {
        console.log("Add Student(create):- ",error);
        return;
    }
}

// update student
module.exports.update= async(req,res)=>{
    try {
        var student;
        console.log(req.body)
        if(req.body.name === "" || req.body.email === "" || req.body.college == ""){
            console.log("cannot accepts empty fiels");
            return res.redirect('back');
        }else{
            student = await Student.findByIdAndUpdate(req.params.id,req.body,{new:true}).populate('batch');
        }
        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found' });
          }
          res.json({ success: true, message: 'Student updated successfully', student });
    } catch (error) {
        console.error('Error updating student:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

// delete student
module.exports.delete = async(req,res)=>{
    try {
        const student = await Student.deleteOne({_id:req.params.id});
        await CourseScore.deleteOne({student:req.params.id});
        await Interview.updateMany({$pull:{students:req.params.id}});
        await Result.deleteOne({student:req.params.id});
        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }
          res.json({ success: true, message: 'All Student data from database deleted successfully', student });
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

