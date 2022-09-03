const nodemailer = require("nodemailer");
const rateLimit = require("express-rate-limit");
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const mongoose = require("mongoose");
const router = require("../controllers/salaryController");
const Salary = mongoose.model("Salary");


// nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_SENDER,
      pass: process.env.PASSWORD_SENDER,
    },
  });
  
  const mailOptions = {
    from: process.env.EMAIL_SENDER,
    to: process.env.ENAIL_RECEIVER,
    subject: "New Salary",
    text: "You have a new salary",
  };
  
  function sendMail() {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }

  // limit the number of requests to the server
  const apiLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // hour
    max: 3, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });



  // new salary
  function insertSalary(req, res) {
    const {position, company, salary, expiernce, education, age, gender, notes} = req.body;
    const salaryForm = new Salary({
      position: position,
      company: company,
      salary: salary,
      expiernce: expiernce,
      education: education,
      age: age,
      gender: gender,
      notes: notes,
    });
  
  
    salaryForm.save((err, doc) => {
      if (!err) {
        res.redirect("/salary/success");
        sendMail();
      } else {
        if (err.name == "ValidationError") {
          handleValidationError(err, req.body);
          res.render("salary/addsalary", {
            viewTitle: "Insert Salary",
            salary: req.body,
          });
        }
      }
    });
  }
  
  // errors
  function handleValidationError(err, body) {
    for (field in err.errors) {
      switch (err.errors[field].path) {
        case "position":
          body["positionError"] = err.errors[field].message;
          break;
        case "salary":
          body["salaryError"] = err.errors[field].message;
          break;
        case "expiernce":
          body["expiernceError"] = err.errors[field].message;
          break;
        case "education":
          body["educationError"] = err.errors[field].message;
          break;
        case "age":
          body["ageError"] = err.errors[field].message;
          break;
        case "gender":
          body["genderError"] = err.errors[field].message;
          break;
      }
    }
  }

  // likes and dislikes
  function like(req, res) {
    Salary.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } }, (err) => {
      if (!err) {
        res.redirect("/salary");
      } else {
        console.log("Error in updating likes :" + JSON.stringify(err, undefined, 2));
      }
    }).exec();
  }

  function dislike(req, res) {
    Salary.findByIdAndUpdate(req.params.id, { $inc: { dislikes: 1 } }, (err) => {
      if (!err) {
        res.redirect("/salary");
      } else {
        console.log("Error in updating dislikes :" + JSON.stringify(err, undefined, 2));
      }
    }).exec();
  }






exports.apiLimiter = apiLimiter;
exports.sendMail = sendMail;
exports.insertSalary = insertSalary;
exports.handleValidationError = handleValidationError;

