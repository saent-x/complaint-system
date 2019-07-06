const router = require("express").Router();
const { Complaint, ValidateComplaint, GetStaffToBeAssigned } = require("../models/complaint");
const Helper = require("../utilities/helper");

router.post("/add", Helper.jwtMiddleware, async (req, res) => {
	console.log(req.body);

	try {
		const { error } = ValidateComplaint(req.body);
		if (error) return res.status(400).send(error.details[0].message);

		const { id } = Helper.GetTokenDetails(req);
		const newComplaint = {
			...req.body,
			Student: id
		};

		let value = await Complaint.find({
			Message: newComplaint.Message,
			Subject: newComplaint.Subject
		});
		if (value.length > 0) throw "complaint has already being lodged!";

		const complaint = new Complaint(newComplaint);

		if (!complaint) throw "an error ocurred while adding a new complaint!";

		const staff = await GetStaffToBeAssigned(complaint.ComplaintRegion);
		if (!staff) throw "An error ocurred while getting staff to be assigned";
		//Assign the staff to the complaint
		complaint.Staff = staff._id;
		const result = await complaint.save();

		if (result) {
			return result ? res.send(result) : res.status(400).send("An error ocurred when getting new result!");
		}
	} catch (error) {
		return res.status(400).send(error);
	}
});

router.get("/all", Helper.jwtMiddleware, async (req, res) => {
	console.log(req.query);

	try {
		let $query = null;
		if (!req.query.id)
			if (!req.query.status) $query = Complaint.find({});
			else $query = Complaint.find({ Status: req.query.status });
		else {
			let StudentFilter = req.query.status
				? { Student: req.query.id, Status: req.query.status }
				: { Student: req.query.id };
			let StaffFilter = req.query.status
				? { Staff: req.query.id, Status: req.query.status }
				: { Staff: req.query.id };

			let filter = Helper.GetTokenDetails(req).type === "student" ? StudentFilter : StaffFilter;

			$query = Complaint.find(filter);
		}
		$query
			.populate("Staff", "Name")
			.select("-FollowUps")
			.then(results => (results ? res.send(results) : res.status(400).send("No Complaint recorded!")))
			.catch(() => res.status(400).send("An error ocurred while getting results!"));
	} catch (error) {
		return res.status(404).send(error);
	}
});

router.get("/", async (req, res) => {
	try {
		Complaint.findOne({
			_id: req.query.id
		})
			.then(result => (result ? res.send(result) : res.status(404).send("Complaint not found")))
			.catch(() => res.status(400).send("An error ocurred while getting the result!"));
	} catch (error) {
		return res.status(404).send(error);
	}
});

router.delete("/", Helper.jwtMiddleware, async (req, res) => {
	try {
		if (!req.query.id) return res.status(400).send("Invalid or No ID!!");
		const complaintToDelete = await Complaint.findOneAndDelete({
			_id: req.query.id
		});

		if (!complaintToDelete) throw `Complaint does not exist!`;
		/**
		 * TODO: Reset the staffs AssignedNumber to 0
		 */
		const result = await complaintToDelete.save();

		if (result) return res.send("Successfully Removed!");
		throw `Failed to delete document, please try again later!!`;
	} catch (error) {
		return res.status(404).send(error);
	}
});

router.put("/", Helper.jwtMiddleware, async (req, res) => {
	try {
		if (!req.query.id || !req.body) return res.status(400).send("Invalid or No ID!!");

		Complaint.findOneAndUpdate(
			{
				_id: req.query.id
			},
			{
				$set: {
					Subject: req.body.Subject,
					Message: req.body.Message
				}
			},
			{
				new: true
			}
		)
			.then(result => (result ? res.send(result) : res.status(400).send("An error ocurred while updating!!")))
			.catch(error => res.status(400).send(error));
	} catch (error) {
		return res.status(404).send(error);
	}
});

module.exports = router;
