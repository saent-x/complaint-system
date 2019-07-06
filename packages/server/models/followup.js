const mongoose = require("mongoose");
const Joi = require("joi");

const FollowUpSchema = new mongoose.Schema({
	Message: String,
	AccountType: String,
	DateAndTime: Date,
	Account: { type: mongoose.Schema.Types.ObjectId },
	Complaint: { type: mongoose.Schema.Types.ObjectId, ref: "Complaint" }
});

const FollowUp = mongoose.model("FollowUp", FollowUpSchema);

function ValidateFollowUp(followup) {
	const schema = {
		Message: Joi.string().required(),
		DateAndTime: Joi.date().required()
	};

	return Joi.validate(followup, schema);
}

module.exports = { FollowUp, ValidateFollowUp };
