const mongoose = require("mongoose");
const Joi = require("joi");

const FollowUpSchema = new mongoose.Schema({
	Message: String,
	AccountType: String,
	DateAndTime: Date
});

const FollowUp = mongoose.model("FollowUp", FollowUpSchema);

function ValidateFollowUp(followup) {
    const schema = {
        Message: Joi.string().required(),
        AccountType: Joi.string().required(),
        DateAndTime: Joi.date().required()
    };

    return Joi.validate(followup, schema);
}

module.exports = { FollowUp, ValidateFollowUp };
