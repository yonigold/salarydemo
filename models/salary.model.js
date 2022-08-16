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
    type: Number,
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
});



mongoose.model("Salary", salarySchema);
