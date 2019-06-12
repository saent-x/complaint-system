const mongoose = require("mongoose");
const router = require("express").Router();
const { Student } = require("../models/student");
const { Staff } = require("../models/staff");

//Register
router.post("/register", async (req, res) => {
  // Validate with Joi

  // check new user type
  const { accountType } = req.body;
  let newAccount = { ...req.body };
  if (accountType.toLowerCase() === "student") {
    const newStudent = new Student({ ...req.body });
    // ...
  } else if (accountType.toLowerCase() === "staff") {
    const newStaff = new Staff({ ...req.body });
    //...
  }
});

//Login
router.post("/", async (req, res) => {
  // Validate with Joi
  // ...
  const credentials = {
    username: req.body.username,
    password: req.body.password,
    accountType: req.body.accountType
  };

  if (credentials.accountType.toLowerCase() === "student") {
    return res.send("Welcome Student!!");
  } else {
    return res.send("Welcome Staff!!");
  }
});

module.exports = router;
