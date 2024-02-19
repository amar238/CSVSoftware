const Interview = require('../models/company');
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
                let removedResult = {};
                // find corresponding result with realtion with interview / company _id and student id with result 
                for (let i = 0;  i < results.length; i++) {
                    const stdResult = results[i];
                    if (stdResult.student.toString() === interviews[interview_index].students[student_index]._id.toString() 
                        && stdResult.company.toString() === interviews[interview_index]._id.toString())
                    {    
                        removedResult = stdResult;
                        break;
                    }
                }
                // add other results
                    resultObject={
                        result : removedResult,
                        student : interviews[interview_index].students[student_index]
                    };
                    resultArray.push(resultObject);
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
        interviews = interviews.reverse();
        return res.render('results',{interviews:interviews});
    } catch (error) {
        console.log("Fetching Interview List:- ",error);
        return;
    }
}

// render page and necessary info to add results
module.exports.result = async(req,res)=>{
    try {
        const interview = await Interview.findById(req.params.id).populate({path:'students',populate:{path:'batch'}});
        const results = await Result.find({company:interview._id, result:"Pending"});
        var resultArray = [];
        for(student_index in interview.students){
            var result = results.find(result=>result.student.toString()=== interview.students[student_index]._id.toString());
            if(!result || result.result != 'Pending'){//to change undefined
                interview.students = interview.students.filter(student => student._id !== result.student.toString());
            }
            resultArray.push(interview.students[student_index]);
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
            await Result.findOneAndUpdate({
                student: req.body.candidateId,
                company: req.body.interviewId,
            },{
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

