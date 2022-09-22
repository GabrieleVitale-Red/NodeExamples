const express = require('express');
const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const serverTestRoutes = require('./api/routes/serverTest');
const mongoCRUDRoutes = require('./api/routes/mongoCRUD');

console.log("Starting connection with mongo!")
mongoose.connect('mongodb://mongo:'+process.env.MONGO_PORT+'/'+process.env.MONGO_COLLECTION);
console.log("Mongo connection status: "+mongoose.connection.readyState=="1" ? "Mongo connection ok!" : "Mongo Connection failure");

//Applying morgan middleware
app.use(morgan('dev'));

//Applying bodyparser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Registering the routes for the services created, our controllers
app.use('/serverTestRoutes', serverTestRoutes);
app.use('/mongoCRUDRoutes', mongoCRUDRoutes);


//Error handling
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message : error.message
        }
    });
});


module.exports = app;