// import mongoose from 'mongoose';
const mongoose=require('mongoose');
const { Schema } = mongoose;

const EventSchema = new Schema({
    org : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'org',
    },
    ename : {
        type: String,
        required : true
    },
    edate : {
        type: String,
        required : true
    },
    etime : {
        type: String,
        required : true
    },
    co_ordinator : {
        type: String,
        required : true
    },
    mode : {
        type :String,
        required: true,
    },
    registration_fee : {
        type: String,
        required : true
    },
    rules : {
        type: String,
        required : true
    },
    address : {
        type: String,
        required : true
    },
    phone : {
        type: String,
        required : true
    },
    date : {
        type : Date,
        required : true,
        default : Date.now
    }
});

const Event= mongoose.model('event',EventSchema);
// User.createIndexes(); -- is remove to avoid email id index(id is required only)
module.exports = Event