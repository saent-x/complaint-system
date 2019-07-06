const router = require("express").Router();
const Helper = require("../utilities/helper");
const { Student } = require("../models/student");
const { Staff } = require("../models/staff");
const { FollowUp, ValidateFollowUp } = require("../models/followup");
const _ = require("lodash");

router.post("/", Helper.jwtMiddleware, async (req, res) => {
	try {
		const { error } = ValidateFollowUp(req.body);
		if (error) return res.status(400).send(error.details[0].message);
		if (!req.query.complaint_id) return res.status(400).send("Please provide the complaint id");

		const { id, type } = Helper.GetTokenDetails(req);

		const followup = new FollowUp({
			...req.body,
			Account: id,
			AccountType: type,
			Complaint: req.query.complaint_id
		});
		if (!followup) return res.status(400).send("An error ocurred while creating a new complaint!");

		const result = await followup.save();
		return result ? res.send(result) : res.status(400).send("an error ocurred while saving the followup!");
	} catch (error) {
		return res.status(404).send(error);
	}
});

router.get("/", Helper.jwtMiddleware, async (req, res) => {
	try {
		if (!req.query.id) return res.status(400).send("Please provide the complaint id!");
		const { type, id } = Helper.GetTokenDetails(req);
		FollowUp.find({ Complaint: req.query.id })
			.select("_id Message DateAndTime Account AccountType")
			.then(async result => {
				if (result.length <= 0) return res.send([]);

				const followupArr = [];
				let account = null;

				for (let followup of result) {
					account =
						followup.AccountType === "student"
							? await Student.findOne({ _id: followup.Account }).select("Name id")
							: await Staff.findOne({ _id: followup.Account }).select("Name id");
					const newResult = _.pick(followup, ["_id", "Message", "DateAndTime"]);
					newResult.Name = account.Name;

					if (account.id === id) newResult.canDelete = true;
					else newResult.canDelete = false;

					followupArr.push(newResult);
				}

				return result && account
					? res.send(followupArr)
					: res.status(400).send("error while getting followups");
			})
			.catch(error => {
				res.status(400).send(error);
			});
	} catch (error) {
		return res.status(404).send(error);
	}
});

router.delete("/", Helper.jwtMiddleware, async (req, res) => {
	try {
		if (!req.query.id) return res.status(400).send("Please provide the followup id!");

		FollowUp.findOneAndDelete({ _id: req.query.id })
			.then(result => (result ? res.send(result) : res.status(400).send("error while deleting followup")))
			.catch(error => {
				throw error;
			});
	} catch (error) {
		return res.status(404).send(error);
	}
});

module.exports = router;
