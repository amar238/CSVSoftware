const Batch = require('../models/batch');
// to validate year
const currentYear = new Date().getUTCFullYear();

module.exports.list = async(req,res) =>{
    try {
        let monthOptions= Batch.schema.path('month').enumValues;
        const batches = await Batch.find();
        // function to sort batches
        const sortBatches = (a, b) => {
            if (a.year !== b.year) {
              return a.year - b.year;
            }
            const monthsOrder = [
              'January', 'February', 'March', 'April', 'May', 'June',
              'July', 'August', 'September', 'October', 'November', 'December'
            ];
            return monthsOrder.indexOf(a.month) - monthsOrder.indexOf(b.month);
          };
        // applying sortBatches function to data   
          const sortedBatches = batches.slice().sort(sortBatches);

        return res.render('batch',{monthOptions,batches:sortedBatches});
    } catch (error) {   
        console.log("batch list:- ", error);
        return;
    }
}

module.exports.create = async(req,res)=>{
    try {
        const batch = await Batch.findOne({year: req.body.year , month: req.body.month});
        // validate current year and existing batch
        if(!batch && req.body.year <= currentYear){
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

module.exports.delete = async(req,res)=>{
    try {
        const batch = await Batch.findByIdAndDelete(req.params.id);
        return res.redirect('back');
    } catch (error) {
        console.log("Deleting batch:- ",error);
    }
    
}