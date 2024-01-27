


module.exports.home = async(req,res)=>{
    try {
        console.log("in home controller");
        return res.render('home');
    } catch (error) {
        console.log(error)
    }
}