const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
    emp_id:{type: String, require: true, unique: true},
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    gender: { type: String, required: true },
    dob: { type: String, required: true },
    address: {type: String},
    phone:{type:String, required:true},
    email:{type:String},
    appraisal:{type:String},
    department:{type:String, required:true},
    position:{type:String, required:true},
    salary: {type:String, required:true},
})

module.exports = mongoose.model("Employee", EmployeeSchema);