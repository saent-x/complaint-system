const mongoose = require('mongoose');
const Joi = require('joi');

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

const Complaint = mongoose.model("Complaint", ComplaintSchema);

function ValidateComplaint(complaint) {
    const schema = {
        Message: Joi.string().required(),
        DateAndTime: Joi.date().required(),
    }
    return Joi.validate(complaint, schema);
}

module.exports = { Complaint, ValidateComplaint };