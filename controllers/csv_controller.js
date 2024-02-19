const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const CourseScore = require('../models/courseScores');
const Result = require('../models/result');

// Display structured data to be downloaded
module.exports.getData = async(req,res)=>{
    try {
        // ogranise all student, interview, course scores and result
        var data=[];
        var student_details;
        var results = await Result.find().populate({
            path:'student',
            populate:{
                path:'batch'
            }
        }).populate('company');
        for( i in results){
            var scores = await CourseScore.findOne({student:results[i].student._id});
            student_details={
                name: results[i].student.name,
                email: results[i].student.email,
                college: results[i].student.college,
                batch: results[i].student.batch.year +" "+results[i].student.batch.month,
                // placement: results[i].student.status,
                dsa: scores.dsa,
                web_dev: scores.webD,
                react: scores.react,
                company: results[i].company.name,
                pos: results[i].company.pos,
                interview_date:results[i].company.interview_date.toISOString().split('T')[0],
                result: results[i].result
            }
            data.push(student_details);
        }

        console.log(data[1])
        res.render('csv-downloader',{data});
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}

// CSV Downloader
module.exports.download = async(req,res)=>{
    try {
        // ogranise all student, interview, course scores and result
        var data=[];
        var student_details;
        var results = await Result.find().populate({
            path:'student',
            populate:{
                path:'batch'
            }
        }).populate('company');
        for( i in results){
            var scores = await CourseScore.findOne({student:results[i].student._id});
            student_details={
                name: results[i].student.name,
                email: results[i].student.email,
                college: results[i].student.college,
                batch: results[i].student.batch.year +" "+results[i].student.batch.month,
                // placement: results[i].student.status,
                dsa: scores.dsa,
                web_dev: scores.webD,
                react: scores.react,
                company: results[i].company.name,
                pos: results[i].company.pos,
                interview_date:results[i].company.interview_date.toISOString().split('T')[0],
                result: results[i].result
            }
            data.push(student_details);
        }

        // Create CSV writer
        const csvWriter = createCsvWriter({
        path: 'data.csv', // File path where CSV will be saved temporarily
        header: [
            { id: 'name', title: 'Name' },
            { id: 'email', title: 'Email' },
            { id: 'college', title: 'College' },
            { id: 'batch', title: 'Batch' },
            { id: 'dsa', title: 'DSA' },
            { id: 'web_dev', title: 'Web Dev' },
            { id: 'react', title: 'React' },
            { id: 'company', title: 'Company' },
            { id: 'pos', title: 'Position' },
            { id: 'interview_date', title: 'Interview Date' },
            { id: 'result', title: 'Result' },
        ]
    });
    // Create CSV writer
    csvWriter.writeRecords(data)
    .then(() => {
        // Set response headers for file download
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="data.csv"');

        // Send the CSV file
        res.download('data.csv', 'data.csv', (err) => {
            if (err) {
                console.error('Error downloading CSV:', err);
            } else {
                console.log('CSV file downloaded successfully');
            }
            });
        })
        .catch(err => {
            console.error('Error writing CSV:', err);
            res.status(500).send('Internal Server Error');
        });
        csvWriter.writeRecords(data)
        .then(() => {
            // Set response headers for file download
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', 'attachment; filename="data.csv"');

            // Send the CSV file
            res.download('data.csv', 'data.csv', (err) => {
                if (err) {
                    console.error('Error downloading CSV:', err);
                } else {
                    console.log('CSV file downloaded successfully');
                }
            });
        })
        .catch(err => {
            console.error('Error writing CSV:', err);
            res.status(500).send('Internal Server Error');
        
    });
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}