const mongoose = require('mongoose');
const { ComplaintSchema } = require('./complaint');

const StudentSchema = {
    Name: String,
    EmailAddress: String,
    MatNo: String,
    Department: String,
    Level: String,
    CourseOfStudy: String,
    Complaints: [mongoose.Schema(ComplaintSchema)],
    NoOfResolvedComplaints: Number,
    NoOfUnresolvevdComplaints: Number
};

const Student = mongoose.model("Student", StudentSchema);

// Validation function

//Exports
module.exports = { Student, StudentSchema };
