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
        list: docs.sort((a, b) => b.createdAt - a.createdAt),
      

        
      });
    } else {
      res.status(400).json("Error in retrieving salary list :" + err);
    }
  }).lean();
});


router.post("/", (req, res) => {
  let search = req.body.searchQueryInput;
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
      if (!err && docs.length > 0) {
        
        res.render("salary/index", {
          list: docs,
        });
      } else {
        // if there is no results for the search query show h4 with the message

        res.render("salary/index", {
          list: docs,
          message: true,
          text: "No results for your search",
        });
    
        
        
      }
      search = "";
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


