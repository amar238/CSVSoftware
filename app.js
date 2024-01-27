const express = require('express');


const session = require('express-session');
const app = express();
const port = 8000;

const expressLayouts = require('express-ejs-layouts');


const db = require('./config/mongoose');

const passport = require("passport");
const passportLocal = require('./config/passport-local-strategy');


const MongoStore = require('connect-mongo');

app.use(express.urlencoded({extended:true}));

// Assets folder
app.use(express.static('./assets'));
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//view engine
app.set('view engine','ejs'); //use express view engine
app.set('views','./views');//default viws route


// mongoStore used to store session cookie
app.use(session({
    name : 'CSV',
    // TO DO : change secret before devlopment////////////////////////////////////////////////////////////
    secret : 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge : (1000 * 60 * 100)
    },
    store: new MongoStore({
        mongoUrl: db._connectionString,
        autoRemove: false
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


// express router////////////////////////////////////////
app.use('/',require('./routes'));//by default fetches index of routes


app.listen(port,(err)=>{
    if(err){
        console.log(`Error in running server: ${err}`);
        
    }
    console.log("server is running on port "+port);
});