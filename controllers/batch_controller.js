const Batch = require('../models/batch');
const Student = require('../models/student');
const customFunctions = require('../customFunctions');
// to validate year
const currentYear = new Date().getUTCFullYear() + 1;

// list of batches along with students details belonging to that batch 
module.exports.list = async(req,res) =>{
    try {
        let monthOptions= Batch.schema.path('month').enumValues;
        let batches = await Batch.find();
        const batchwise_student_list = []
        //sort batches and reverse it for displaying recent batches
        batches = (batches.slice().sort(customFunctions.sortBatches)).reverse();
        let batch_students_list;
        for(let i in batches){
            const students = await Student.find({ batch: batches[i]._id });
            batch_students_list = {
                batch : batches[i],
                students : students
            }
            batchwise_student_list.push(batch_students_list);
        }
        return res.render('batch',{monthOptions,batches:batchwise_student_list});
    } catch (error) {   
        console.log("batch list:- ", error);
        return;
    }
}

// create batch
module.exports.create = async(req,res)=>{
    try {
        const batch = await Batch.findOne({year: req.body.year , month: req.body.month});
        // validate current year and existing batch
        if(!batch && req.body.year <= currentYear && req.body.year >=2020){
            await Batch.create(req.body);
            return res.redirect('/batch/list');  
        }else{
            console.log("Batch exist || Invalid Year");
            return res.redirect('back');
        }
    } catch (error) {
        console.log("Creating batch:- ",error);
        return;
    }
}  

// update batch
module.exports.update = async(req,res)=>{
    try {
        const existingBAtch = await Batch.findOne({year:req.body.year, month:req.body.month});
        // validate current year and existing batch
        if(!existingBAtch && req.body.year <= currentYear ){
            await Batch.findByIdAndUpdate(
                req.body._id,
                {
                    year: req.body.year,
                    month: req.body.month
                }
            );
            return res.redirect('back');
        }
        else{
            console.log("Cannot update batch to existing Batch");
        }
        
    } catch (error) {   
        console.log("Update Batch:- ",error);
        return;
    }
}

// delete batch only if it doesnt have students
module.exports.delete = async(req,res)=>{
    try {
        let batch;
        if((await Student.find({batch:req.params.id})).length == 0 ){
            batch= await Batch.deleteOne({_id:req.params.id});
            return res.redirect('back'); 
        }else{
            console.log("Batch consist of students");
            return res.redirect('back');
        }
        
    } catch (error) {
        console.log("Deleting batch:- ",error);
    }
    
}