// import mongoose from 'mongoose';
const mongoose=require('mongoose');
const { Schema } = mongoose;

const OrgSchema = new Schema({
    name : {
        type: String,
        required : true
    },
    aname : {
        type: String,
        required : true
    },
    adesignation : {
        type: String,
        required : true
    },
    aemail : {
        type :String,
        required: true,
        unique : true
    },
    aphone : {
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

const Org= mongoose.model('org',OrgSchema);
// User.createIndexes(); -- is remove to avoid email id index(id is required only)
module.exports = Org