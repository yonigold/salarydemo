const mongoose = require("mongoose");



let salarySchema = new mongoose.Schema({
  position: {
    type: String,
    required: "this field is required",


  },

  
  company: {
    type: String,


  },
  salary: {
    type: String,
    required: "this field is required",


  },
  expiernce: {
    type: String,
    required: "this field is required",


  },
  education: {
    type: String,
    required: "this field is required",

  },
  age: {
    type: Number,
    required: "this field is required",

  },
  gender: {
    type: String,
    required: "this field is required",
  },
  notes: {
    type: String,

  },

  isApproved: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
  
    default: Date.now,
  },



});

const Salary = mongoose.model("Salary", salarySchema);
module.exports = Salary;

// module.exports = mongoose.model("Salary", salarySchema);
// mongoose.model("Salary", salarySchema);









