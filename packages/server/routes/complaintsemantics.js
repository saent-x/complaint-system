const router = require("express").Router();
const { Student } = require("../models/student");
const { Staff } = require("../models/staff");
const { Complaint, ValidateComplaint, AssignComplaintToStaff, GetStaffToBeAssigned } = require("../models/complaint");
const Helper = require("../utilities/helper");

router.post("/add", Helper.jwtMiddleware, async (req, res) => {
	try {
		const { error } = ValidateComplaint(req.body);
		const { id } = Helper.GetTokenDetails(req);
		if (error) return res.status(400).send(error.details[0].message);

		const newComplaint = {
			...req.body,
			Student: id
		};
		//Check duplicate by checking the complaints array of the student
		const $Student = await Student.findOne({ _id: id }).populate("Complaints");
		if ($Student) {
			let value = $Student.Complaints.find(complaint => complaint.Message.toLower() === newComplaint.Message);
			if (!value) {
				const complaint = new Complaint(newComplaint);
				const result = await complaint.save();
				//After saving the new complaint, assign the complaint to a staff
				if (result) {
					const staff = AssignComplaintToStaff(GetStaffToBeAssigned(), result._id);
					// If that worked send the updated complaint object
					if (staff) {
						const newResult = await Complaint.findOne({ _id: result._id });
						return newResult ? res.send(newResult) : res.status(400).send("An error ocurred when getting new result!");
					}

					return res.status(400).send("An error ocurred while getting staff to be assigned");
				}
				return res.status(400).send("an error ocurred while adding a new complaint!");
			}

			return res.status(400).send("complaint has already being lodged!");
		}
		return res.status("invalid student!");
	} catch (error) {
		return res.status(404).send(error);
	}
});

router.get("/all", Helper.jwtMiddleware, async (req, res) => {
	try {
		const filter = Helper.GetTokenDetails(req).type === "student" ? { "Student._id": req.query.id } : { "Staff._id": req.query.id };
		const $query = req.query.id ? Complaint.find(filter) : Complaint.find({});
		$query
			.then(results => (results ? res.send(results) : res.status(400).send("No Complaint recorded!")))
			.catch(() => res.status(400).send("An error ocurred while getting results!"));
	} catch (error) {
		return res.status(404).send(error);
	}
});

router.get("/", async (req, res) => {
	try {
		Complaint.findOne({ _id: req.query.id })
			.then(result => (result ? res.send(result) : res.status(404).send("Complaint not found")))
			.catch(() => res.status(400).send("An error ocurred while getting the result!"));
	} catch (error) {
		return res.status(404).send(error);
	}
});

router.delete("/", Helper.jwtMiddleware, async (req, res) => {
	try {
		if (!req.query.id) return res.status(400).send("Invalid or No ID!!");

		Complaint.findOneAndDelete({ _id: req.query.id })
			.then(result => (result ? res.send(result) : res.status(400).send("An error ocurred while deleting!!")))
			.catch(error => res.status(400).send(error));
	} catch (error) {
		return res.status(404).send(error);
	}
});

router.put("/", Helper.jwtMiddleware, async (req, res) => {
	try {
		if (!req.query.id || !req.body) return res.status(400).send("Invalid or No ID!!");

		Complaint.findOneAndUpdate(
			{ _id: req.query.id },
			{
				$set: {
					Message: req.body.Message,
					Department: req.body.Department
				}
			},
			{ new: true }
		)
			.then(result => (result ? res.send(result) : res.status(400).send("An error ocurred while updating!!")))
			.catch(error => res.status(400).send(error));
	} catch (error) {
		return res.status(404).send(error);
	}
});

module.exports = router;
