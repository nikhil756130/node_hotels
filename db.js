const mongoose = require('mongoose');

//Define te MongoDB connection URL

const mongoURL = 'mongodb://localhost:27017/hotels'   //we can replace 'mydatabase' with your database name


// Set up MongoDB connection
mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

//Get the default connection
const db = mongoose.connection;

//Define event listeners
db.on('connected', () => {
    console.log('Connected to MongoDB server');
});

db.on('error', (err) => {
    console.log('MongoDB connection error', err);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});


//Export the database connection
module.exports = db;