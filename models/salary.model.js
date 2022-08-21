const mongoose = require("mongoose");
const joi = require("joi");

let salarySchema = new mongoose.Schema({
  position: {
    type: String,
    required: "this field is required",
    // minlength: [3, "this field must be at least 3 characters long"],
    // maxlength: [50, "this field must be less than 50 characters long"],

  },

  
  company: {
    type: String,
    // minlength: [2, "this field must be at least 2 characters long"],
    // maxlength: [50, "this field must be less than 50 characters long"],

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
    // minlength: [2, "this field must be at least 2 characters long"],
    // maxlength: [30, "this field must be less than 50 characters long"],
  },
  age: {
    type: Number,
    required: "this field is required",
    // minlength: [2, "this field must be at least 2 characters long"],
    // maxlength: [30, "this field must be less than 50 characters long"],
  },
  gender: {
    type: String,
    required: "this field is required",
  },
  notes: {
    type: String,
    // minlength: [2, "this field must be at least 2 characters long"],
    // maxlength: [50, "this field must be less than 50 characters long"],
  },

  isApproved: {
    type: Boolean,
    default: false,
  },
});



mongoose.model("Salary", salarySchema);









