const passport = require("passport");
const LocalStrategy = require("passport-local");

const Emp = require('../models/employee');

//authentication using passport
passport.use(new LocalStrategy(
    {
        usernameField: "email",
        passReqToCallback: true
    },
    async (req, email, password, done) => {
    // find employee and establish identity
        try {
            const emp = await Emp.findOne({ email: email });
            if (!emp || emp.password != password) { 
                return done(null, false);
            }
            return done(null, emp); //returns to serializer
        } catch (error) {
            return done(error);
        }   
    })
);

  // serializing the user to decide which key is to be kept in the cookie
passport.serializeUser((emp, done) => {
 
    done(null, emp.id);//goes to deserializer
});
  
// deserializing the user from the key in cookie
passport.deserializeUser(async (id, done) => {
    try {
        const emp =await Emp.findById(id);
        // console.log(user);
        return done(null, emp);
    } catch (error) {
        console.log("Error in finding user ---> passport");
        return done(error);
    }
});

// check user authenticated 
passport.checkAuthentication = (req,res,next)=>{
    // if user is authenticated send to next page
    // console.log(req.isAuthenticated());
    if(req.isAuthenticated()){
      return next();
    }
    // sending user back to sign in 
     return res.redirect('/emp/sign-in');
}
  
  passport.setAuthenticatedUser = (req,res,next)=>{
    if(req.isAuthenticated()){
    
      // req.user contains current signed in user from session cookie -> forwarding it to locals for view
      res.locals.emp = req.emp;
    }
    console.log("inside set authenticated");
    return next();
  }
  
  module.exports = passport;
  