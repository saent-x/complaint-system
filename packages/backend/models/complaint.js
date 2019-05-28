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
    Status: String /* Resolved or Unresolved */
};

module.exports = { ComplaintSchema };