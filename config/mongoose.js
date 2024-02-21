const mongoose = require('mongoose');

// local mongoDB address
mongoose.connect(process.env.DB);
const db = mongoose.connection;
db.on('error',console.error.bind(console,"Error in connceting db"));
db.once('open',()=>{
    console.log(db._connectionString);
})

module.exports = db;