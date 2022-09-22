//Creation of the model for the DB Document
const mongoose = require('mongoose');

const testMongoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    testName: String,
    testValue:  Number
});

module.exports = mongoose.model('TestModel', testMongoSchema); 