const Emp = require('../models/employee');

// sign up page
module.exports.singUp = async(req,res)=>{
    try {
        console.log("in sign up controller");
        return res.render('sign_up');
    } catch (error) {
        console.log(error)
    }
}

// creating employee
module.exports.create = async(req,res)=>{
    try {
        
        if(req.body.password!= req.body.password1){
            return res.redirect('back');
        }
        const emp = await Emp.findOne({email: req.body.email});

        if(!emp){
            await Emp.create(req.body);
            return res.redirect('/');  // To be change later
        }else{
            return res.redirect('back');
        }
    } catch (error) {
        console.log(error);
        return;
    }
} 

// sign in page
module.exports.singIn =(req,res)=>{
    try {
        return res.render('sign_in');
    } catch (error) {
        console.log(error)
    }
}

//after sign in
module.exports.createSession = (req,res)=>{
    return res.redirect('/');
}

// logout
module.exports.destroySession = (req,res)=>{
    req.logout((err)=>{});
    return res.redirect('/');
}
    