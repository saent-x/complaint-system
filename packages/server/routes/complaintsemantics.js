const router = require("express").Router();
const { Student } = require("../models/student");
const { Staff } = require("../models/staff");
const { Complaint, ValidateComplaint, AssignComplaintToStaff, GetStaffToBeAssigned } = require("../models/complaint");
const Helper = require("../utilities/helper");

router.post("/add", Helper.jwtMiddleware, async (req, res) => {
	console.log(req.body);

	try {
		const { error } = ValidateComplaint(req.body);
		if (error) return res.status(400).send(error.details[0].message);

		const { id } = Helper.GetTokenDetails(req);
		console.log(id);
		const newComplaint = {
			...req.body,
			Student: id
		};

		//Check duplicate by checking the complaints array of the student
		const $Student = await Student.findOne({ _id: id }).populate("Complaints");
		if ($Student) {
			let value = $Student.Complaints.find(complaint => complaint.Message.toLowerCase() === newComplaint.Message && complaint.Subject.toLowerCase() === newComplaint.Subject);
			if (!value) {
				const complaint = new Complaint(newComplaint);

				if (complaint) {
					const staff = await GetStaffToBeAssigned(complaint.ComplaintRegion);
					if (staff) {
						//Assign the staff to the complaint
						complaint.Staff = staff._id;
						const savedComplaint = await complaint.save();
						//Add the saved complaint to the complaints array in student
						$Student.Complaints.push(complaint._id);
						await $Student.save();
						//Add the complaint to the complaints array in the staff object
						const result = await AssignComplaintToStaff(staff, savedComplaint._id);
						return result ? res.send(result) : res.status(400).send("An error ocurred when getting new result!");
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
		let $query = null;
		if (!req.query.id)
			$query = Complaint.find({});
		else {
			const filter = Helper.GetTokenDetails(req).type === "student" ? { "Student": req.query.id } : { "Staff": req.query.id };
			$query = Complaint.find(filter);
		}
		$query
			.populate('Staff', 'Name')
			.select('-FollowUps')
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
					Subject: req.body.Subject,
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
