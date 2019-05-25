const mongoose = require('mongoose');
const router = require('express').Router();
const { Student } = require('../models/student');
const { Staff } = require('../models/staff');

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

module.exports = router;
