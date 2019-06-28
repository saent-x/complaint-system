const mongoose = require("mongoose");
const router = require("express").Router();
const { Student, ValidateStudent } = require("../models/student");
const { Staff, ValidateStaff } = require("../models/staff");
const Joi = require("joi");
const Helper = require("../utilities/helper");
const jwt = require("jsonwebtoken");

//Register
router.post("/register", async (req, res) => {
	try {
		const isStudent = req.query.type === "student";
		const { error } = isStudent
			? ValidateStudent(req.body)
			: ValidateStaff(req.body);

		if (error) return res.status(400).send(error.details[0].message);

		const newAccount = isStudent
			? new Student({ ...req.body })
			: new Staff({ ...req.body });
		const result = await newAccount.save();
		if (result) return res.send(result);
		return res
			.status(400)
			.send("an error ocurred while creating a new account!");
	} catch (error) {
		return res.status(400).send(error);
	}
});

//Login
router.post("/", async (req, res) => {
	try {
		const schema = {
			EmailAddress: Joi.string().required(),
			Password: Joi.string()
				.min(8)
				.required()
		};

		const { error } = Joi.validate(req.body, schema);

		if (error) return res.status(400).send(error.details[0].message);

		const isStudent = req.query.type === "student";
		const result = isStudent
			? await Student.findOne({ ...req.body })
			: await Staff.findOne({ ...req.body });

		if (result) {
			const token = jwt.sign(
				{
					id: result._id,
					email: result.EmailAddress,
					type: req.query.type
				},
				Helper.JWT_SECRET,
				{ expiresIn: "1h" }
			);

			return res.send({ token });
		}

		return res.status(404).send("Account not found!");
	} catch (error) {
		return res.status(400).send(error);
	}
});

module.exports = router;
