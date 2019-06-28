const mongoose = require("mongoose");
const Joi = require("joi");
const { Staff } = require("../models/staff");
const _ = require("lodash");

const ComplaintSchema = {
	Message: String,
	DateAndTime: Date,
	Department: String,
	FollowUps: [{ type: mongoose.Schema.Types.ObjectId, ref: "FollowUp" }],
	Status: { type: String, default: "pending" },
	Student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
	Staff: { type: mongoose.Schema.Types.ObjectId, ref: "Staff" }
};

const Complaint = mongoose.model("Complaint", ComplaintSchema);

function ValidateComplaint(complaint) {
	const schema = {
		Message: Joi.string().required(),
		Department: Joi.string().required(),
		DateAndTime: Joi.date().required()
	};
	return Joi.validate(complaint, schema);
}

async function GetStaffToBeAssigned() {
	// Filter any staff with more than 2 complaints
	let selected = null;
	const filter = await Staff.find({}).populate("AssignedComplaints");
	if (filter) {
		if (filter.length > 0) {
			const qualified = filter.filter(element => element.AssignedComplaints.length < 2);
			//Randomly pick a staff
			selected = qualified.length > 0 ? qualified[_.random(qualified.length - 1, 0, false)] : filter[_.random(filter.length - 1, 0, false)];
			return selected;
		}
		return null;
	}
	return null;
}

function AssignComplaintToStaff(staff, complaint_id) {
	Staff.findOneAndUpdate(
		{ _id: staff._id },
		{
			$push: {
				AssignedComplaints: complaint_id
			}
		},
		{ new: true }
	)
		.then(result => (result ? result : null))
		.catch(() => null);
}

module.exports = { Complaint, ValidateComplaint, GetStaffToBeAssigned, AssignComplaintToStaff };
