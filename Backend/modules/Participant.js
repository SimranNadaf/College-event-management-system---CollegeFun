
// import mongoose from 'mongoose';
const mongoose=require('mongoose');
const { Schema } = mongoose;

const ParticipantSchema = new Schema({
    org : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'org',
    },
    event : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'event',
    },
    student : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'student',
    },
    date : {
        type : Date,
        required : true,
        default : Date.now
    }
});

const Participant= mongoose.model('participant',ParticipantSchema);
// User.createIndexes(); -- is remove to avoid email id index(id is required only)
module.exports = Participant