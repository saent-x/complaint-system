const mongoose = require('mongoose');
const router = require('express').Router();
const { Student } = require('../models/student');
const { Staff } = require('../models/staff');

//Login
router.post('/', async (req, res) => {
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

//Register
router.post('/register', async (req, res) => {
    // Validate with Joi

    // check new user type
    const { accountType } = req.body;
    if (accountType.toLowerCase() === "student") {

        const newStudentCreds = {
            Name: req.body.Name,
            EmailAddress: req.body.EmailAddress,
            MatNo: req.body.MatNo,
            Department: req.body.Department,
            Level: req.body.Level,
            CourseOfStudy: req.body.CourseOfStudy,
            Complaints: req.body.Complaints
        };

        
    }
    else if (accountType.toLowerCase() === "staff") {
        const newStaffCreds = {
            Name,
            StaffNo,
            ManagingDepartment,
            EmailAddress,
            AssignedComplaints
        }
    }

});

module.exports = router;
