const express = require('express');



const app = express();
const port = 8000;

const expressLayouts = require('express-ejs-layouts');

const db = require('./config/mongoose');

app.use(express.urlencoded({extended:true}));

// Assets folder
app.use(express.static('./assets'));
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//view engine
app.set('view engine','ejs'); //use express view engine
app.set('views','./views');//default viws route

// express router////////////////////////////////////////
app.use('/',require('./routes'));//by default fetches index of routes


app.listen(port,(err)=>{
    if(err){
        console.log(`Error in running server: ${err}`);
        
    }
    console.log("server is running on port "+port);
});