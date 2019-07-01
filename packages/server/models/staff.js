const mongoose = require("mongoose");
const Joi = require("joi");

const AdminCredsSchema = new mongoose.Schema({
	isAdmin: Boolean,
	AdministrativeDepartment: { type: String, required: true }
});

const StaffSchema = new mongoose.Schema({
	Name: String,
	StaffNo: String,
	Department: String,
	EmailAddress: String,
	ComplaintRegion: { type: String, enum: ["Hostel", "Faculty", "Cafeteria", "Others"] },
	Password: String,
	AdminCreds: AdminCredsSchema,
	AssignedComplaints: [{ type: mongoose.Schema.Types.ObjectId, ref: "Complaint" }]
});

function ValidateStaff(staff) {
	const schema = {
		Name: Joi.string().required(),
		Password: Joi.string()
			.min(8)
			.required(),
		ComplaintRegion: Joi.string().required(),
		StaffNo: Joi.string().required(),
		Department: Joi.string().required(),
		EmailAddress: Joi.string()
			.email()
			.required()
	};

	return Joi.validate(staff, schema);
}

const Staff = mongoose.model("Staff", StaffSchema);

module.exports = { Staff, StaffSchema, ValidateStaff };
