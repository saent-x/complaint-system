const mongoose = require("mongoose");
const Joi = require("joi");
const { Staff } = require("../models/staff");
const _ = require("lodash");

const ComplaintSchema = new mongoose.Schema({
	Subject: String,
	Message: String,
	DateAndTime: Date,
	ComplaintRegion: { type: String, enum: ["Hostel", "Faculty", "Cafeteria", "Others"] },
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

async function Reset() {
	const staffs = await Staff.find({});
	for (let staff of staffs) {
		if (staff.AssignedNumber === 1) {
			staff.AssignedNumber = 0;
			const update = await staff.save();
			if (!update) return 0;
		}
	}
	return 1;
}

// TODO: To be optimized
async function GetStaffToBeAssigned(complaintRegion) {
	const assign = async () => {
		const staff_ids = await Staff.find({ ComplaintRegion: complaintRegion, AssignedNumber: 0 }).select(
			"_id Name AssignedNumber"
		);

		staff_ids[0].AssignedNumber = 1;
		const staff_id = staff_ids[0]._id;
		await staff_ids[0].save();

		return staff_id;
	};

	const staff_ids = await Staff.find({ ComplaintRegion: complaintRegion })
		.lean()
		.select("_id Name AssignedNumber");
	const switchCheck = staff_ids.filter(staff => staff.AssignedNumber === 1).length === staff_ids.length;
	if (!switchCheck) return await assign();

	if (await Reset()) return await assign();
}

module.exports = { Complaint, ValidateComplaint, GetStaffToBeAssigned };
