const router = require("express").Router();
const { Student } = require("../models/student");
const { Staff } = require("../models/staff");
const { ValidateComplaint } = require("../models/complaint");
const Helper = require("../utilities/helper");

router.post("/add", async (req, res) => {
	try {
		const { error } = ValidateComplaint(req.body);
		const { type, id } = Helper.GetTokenDetails(/** TODO: enter the token */);
		if (error) return res.status(400).send(error.details[0].message);

		const filterandUpdate = {
			id: { _id: id },
			actions: {
				$push: {
					Complaint: req.body
				}
			}
		};
		const update =
			type === "student"
				? Student.findOneAndUpdate(filterandUpdate.id, filterandUpdate.actions)
				: Staff.findOneAndUpdate(filterandUpdate.id, filterandUpdate.actions);

		update
			.then(value => {
				if (value) return res.send(value);
				throw "error ocurred while updating!!";
			})
			.catch(err => res.status(400).send(err));
	} catch (error) {
		return res.status(404).send(error);
	}
});
