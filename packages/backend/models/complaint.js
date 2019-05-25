const mongoose = require('mongoose');

const FollowUpSchema = new mongoose.Schema({
    Message: String,
    Reply: String,
    DateAndTime: Date,
});

const ComplaintSchema = {
    Message: String,
    DateAndTime: Date,
    FollowUps: [FollowUpSchema],
    Status: String
};

module.exports = { ComplaintSchema };