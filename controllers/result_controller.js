const Interview = require('../models/company');
const Student = require('../models/student');
const CourseScore = require('../models/courseScores');
const Result = require('../models/result');

const resultOptions= Result.schema.path('result').enumValues;

// fetch interview data along with student eligible to appear for interview
module.exports.interviews = async(req,res)=>{
    try {
        var results = await Result.find();
        var interviews = await Interview.find().populate({path:'students',populate:{path:'batch'}});
        // cobmbine interview data with students appearing and their results
        for(interview_index in interviews){    
            var resultArray = [];
            for(student_index in interviews[interview_index].students){
                var resultObject = {};
                let removedResult;
                // find corresponding result and remove it too increase efficiency
                results = results.filter(result => {
                    if (result.student.toString() === interviews[interview_index].students[student_index]._id.toString()) {
                       
                        removedResult = result;
                        return false; // Exclude the element from the new array
                    }
                    return true; // Include all other elements in the new array
                });
                if(removedResult === undefined){
                    resultObject={
                        result : "pending",
                        student : interviews[interview_index].students[student_index]
                    };
                    resultArray.push(resultObject);
                }else{
                    resultObject={
                        result : removedResult,
                        student : interviews[interview_index].students[student_index]
                    };
                    resultArray.push(resultObject);
                }
            }
            // replace students_id array appearing for interview with student details and corresponding results 
            interviews[interview_index] = {
                _id: interviews[interview_index]._id,
                name: interviews[interview_index].name,
                pos: interviews[interview_index].pos,
                interview_date: interviews[interview_index].interview_date,
                students:resultArray
            }
        }
        return res.render('results',{interviews});
    } catch (error) {
        console.log("Fetching Interview List:- ",error);
        return;
    }
}

// render page and necessary info to add results
module.exports.result = async(req,res)=>{
    try {
        const interview = await Interview.findById(req.params.id).populate({path:'students',populate:{path:'batch'}});
        const results = await Result.find({company:interview._id});
        var resultArray = [];
        for(student_index in interview.students){
            var result = results.find(result=>result.student.toString()=== interview.students[student_index]._id.toString());
            if(result === undefined){
                resultArray.push(interview.students[student_index]);
            }
        }       
        return res.render('result',{interview,resultArray,resultOptions});        
    } catch (error) {
        console.log("Error in fecthing candidates list",error);
        return;
    }
}
// add  results
module.exports.addResult = async(req,res)=>{
    try {
        if(req.body){
            await Result.create({
                student: req.body.candidateId,
                company: req.body.interviewId,
                result: req.body.result
            });
        }
        // Send a dummy success response
        res.status(200).send('Result added successfully');
    } catch (error) {
        console.log("Error recording results:- ",error);
        res.status(400).send("Error in recording result");
    }

}

