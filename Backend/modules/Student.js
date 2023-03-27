// import mongoose from 'mongoose';
const mongoose=require('mongoose');
const { Schema } = mongoose;

const StudentSchema = new Schema({
    fname : {
        type: String,
        required : true
    },
    mname : {
        type: String,
        required : true
    },
    lname : {
        type: String,
        required : true
    },
    gender : {
        type: String,
        required : true
    },
    email : {
        type :String,
        required: true,
        unique : true
    },
    phone : {
        type: String,
        required : true
    },
    country : {
        type: String,
        required : true
    },
    state : {
        type: String,
        required : true
    },
    city : {
        type: String,
        required : true
    },
    education : {
        type: String,
        required : true
    },
    institution : {
        type: String,
        required : true
    },
    password : {
        type :String,
        require : true
    },
    date : {
        type : Date,
        required : true,
        default : Date.now
    }
});

const Student= mongoose.model('student',StudentSchema);
// User.createIndexes(); -- is remove to avoid email id index(id is required only)
module.exports = Student