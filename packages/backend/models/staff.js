const mongoose = require('mongoose');
const { ComplaintSchema } = require('./complaint');

const StaffSchema = new mongoose.Schema({
    Name: String,
    StaffNo: String,
    ManagingDepartment: String,
    EmailAddress: String,
    AssignedComplaints: [ mongoose.Schema(ComplaintSchema) /* Format for exported schemas */]
});

const Staff = mongoose.model("Staff", StaffSchema);

module.exports = { Staff, StaffSchema };