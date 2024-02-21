const mongoose = require('mongoose');

var Username = encodeURIComponent(process.env.username);
var Password = encodeURIComponent(process.env.password);
var DB = process.env.DB


// local mongoDB address
mongoose.connect(`mongodb+srv://${Username}:${Password}@${DB}`);
const db = mongoose.connection;
db.on('error',console.error.bind(console,"Error in connceting db"));
db.once('open',()=>{
    console.log(db._connectionString);
})

module.exports = db;

