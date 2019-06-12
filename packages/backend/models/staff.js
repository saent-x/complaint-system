const mongoose = require("mongoose");
const { ComplaintSchema } = require("./complaint");
const Joi = require("joi");

const StaffSchema = new mongoose.Schema({
	Name: String,
	StaffNo: String,
	ManagingDepartment: String,
    EmailAddress: String,
    Password: String,
	AssignedComplaints: [
		mongoose.Schema(ComplaintSchema) /* Format for exported schemas */
	]
});

function ValidateStaff(staff) {
	const schema = {
        Name: Joi.string().required(),
        Password: Joi.string().min(8).required(),
		StaffNo: Joi.string().required(),
		ManagingDepartment: Joi.string().required(),
		EmailAddress: Joi.string()
			.email()
			.required()
	};

	return Joi.validate(staff, schema);
}

const Staff = mongoose.model("Staff", StaffSchema);

module.exports = { Staff, StaffSchema, ValidateStaff };
