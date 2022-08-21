const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Salary = mongoose.model("Salary");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const rateLimit = require("express-rate-limit");



const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.PASSWORD_SENDER,
  },
});

const mailOptions = {
  from: process.env.EMAIL_SENDER,
  to: "adirgilad132@gmail.com",
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


const apiLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // hour
	max: 3, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

router.get("/", (req, res) => {
  Salary.find({ isApproved: true }, (err, docs) => {
    if (!err) {
      res.render("salary/index", {
        list: docs,
      });
    } else {
      console.log(
        "Error in Retriving Salaries :" + JSON.stringify(err, undefined, 2)
      );
    }
  }).lean();
});

router.post("/", (req, res) => {
  let search = req.body.search;
  Salary.find(
    {
      isApproved: true,
      $or: [
        { position: { $regex: search } },
        { company: { $regex: search } },
        { salary: { $regex: search } },
        { expiernce: { $regex: search } },
        { education: { $regex: search } },
      ],
    },
    (err, docs) => {
      if (!err) {
        res.render("salary/index", {
          list: docs,
        });
      } else {
        console.log(
          "Error in Retriving Employees :" + JSON.stringify(err, undefined, 2)
        );
      }
    }
  ).lean();
});

router.get("/addsalary", (req, res) => {
  res.render("salary/addsalary");
});

router.post("/addsalary", apiLimiter, (req, res) => {
  insertSalary(req, res);
  sendMail();

});


function insertSalary(req, res) {
  let salary = new Salary();
  salary.position = req.body.position;
  salary.company = req.body.company;
  salary.salary = req.body.salary.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  salary.expiernce = req.body.expiernce;
  salary.education = req.body.education;
  salary.age = req.body.age;
  salary.gender = req.body.gender;
  salary.notes = req.body.notes;
  salary.save((err, doc) => {
    if (!err) {
      res.redirect("/salary");
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


module.exports = router;
module.exports.insertSalary = insertSalary;
