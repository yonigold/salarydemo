const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Salary = mongoose.model("Salary");
const dotenv = require("dotenv");
dotenv.config();
const rateLimit = require("express-rate-limit");
const { sendMail } = require("../services/service");
const { apiLimiter } = require("../services/service");
const { insertSalary } = require("../services/service");
const { handlevalidationErrors } = require("../services/service");




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
        { position: { $regex: search, $options: "i" } },
        { company: { $regex: search }, $options: "i" },
        { salary: { $regex: search } },
        { expiernce: { $regex: search, $options: "i" } },
        { education: { $regex: search, $options: "i" } },
      ],
    },
    (err, docs) => {
      if (!err) {
        res.render("salary/index", {
          list: docs,
        });
      } else {
        console.log(
          "Error in Retriving Salaries :" + JSON.stringify(err, undefined, 2)
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
  
});

router.get("/success", (req, res) => {
  res.render("salary/success");
});



module.exports = router;
module.exports.insertSalary = insertSalary;


