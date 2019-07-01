const mongoose = require("mongoose");
const Joi = require("joi");
const { Staff } = require("../models/staff");
const _ = require("lodash");

const ComplaintSchema = new mongoose.Schema({
	Subject: String,
	Message: String,
	DateAndTime: Date,
	ComplaintRegion: { type: String, enum: ["Hostel", "Faculty", "Cafeteria", "Others"] },
	FollowUps: [{ type: mongoose.Schema.Types.ObjectId, ref: "FollowUp" }],
	Status: { type: String, default: "pending" },
	Student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
	Staff: { type: mongoose.Schema.Types.ObjectId, ref: "Staff" }
});

const Complaint = mongoose.model("Complaint", ComplaintSchema);

function ValidateComplaint(complaint) {
	const schema = {
		Subject: Joi.string().required(),
		Message: Joi.string().required(),
		ComplaintRegion: Joi.string().required(),
		DateAndTime: Joi.date().required()
	};
	return Joi.validate(complaint, schema);
}

async function GetStaffToBeAssigned(complaintRegion) {
	// Filter any staff with more than 2 complaints
	let selected = null;
	const staffList = await Staff.find({ ComplaintRegion: complaintRegion }).populate("AssignedComplaints");
	if (staffList) {
		if (staffList.length > 0) {
			const qualified = staffList.filter(element => element.AssignedComplaints.length < 2);
			//Pick the first Staff on the list
			selected = qualified.length > 0 ? qualified[0] : staffList[0];
			return selected;
		}
		return null;
	}
	return null;
}

async function AssignComplaintToStaff(staffTobeAssigned, complaint_id) {
	const staff = await Staff.findOne({ _id: staffTobeAssigned._id });
	staff.AssignedComplaints.push(complaint_id);
	return await staff.save();
}

module.exports = { Complaint, ValidateComplaint, GetStaffToBeAssigned, AssignComplaintToStaff };
