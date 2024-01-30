const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
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
            const user = await Emp.findOne({ email: email });
            if (!user || user.password != password) { 
                return done(null, false);
            }
            return done(null, user); //returns to serializer
        } catch (error) {
            return done(error);
        }   
    })
);

// serializing the user to decide which key is to be kept in the cookie
passport.serializeUser((user, done) => {
 
    done(null, user.id);//goes to deserializer
});
  
// deserializing the user from the key in cookie
passport.deserializeUser(async (id, done) => {
    try {
        const user =await Emp.findById(id);
        return done(null, user);
    } catch (error) {
        console.log("Error in finding user ---> passport");
        return done(error);
    }
});

// check user authenticated 
passport.checkAuthentication = (req,res,next)=>{
    // if user is authenticated send to next page
    if(req.isAuthenticated()){
        return next();
    }
    // sending user back to sign in 
    return res.redirect('/emp/sign-in');
}
  
passport.setAuthenticatedUser = (req,res,next)=>{
    // req.user contains current signed in user from session cookie -> forwarding it to locals for view
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    return next();
}
  
module.exports = passport;
  