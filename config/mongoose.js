const mongoose = require('mongoose');


mongoose.connect("mongodb://localhost:27017/csv");

const db = mongoose.connection;


db.on('error',console.error.bind(console,"Error in connceting db"));


db.once('open',()=>{
    console.log(db._connectionString);
})

module.exports = db;