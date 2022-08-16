const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Salary = mongoose.model("Salary");


router.get("/", (req, res) => {
    Salary.find((err, docs) => {
        if (!err) {
            res.render("salary/index", {
                list: docs
            });
        } else {
            console.log("Error in Retriving Employees :" + JSON.stringify(err, undefined, 2));
        }
    }).lean();

 
});

router.get("/addsalary", (req, res) => {
  res.render("salary/addsalary");

});


router.post('/addsalary', insertSalary);

  

// });

function insertSalary(req, res) {
  let salary = new Salary();
  salary.position = req.body.position;
salary.company = req.body.company;
  salary.salary = req.body.salary;
  salary.expiernce = req.body.expiernce;
  salary.education = req.body.education;
  salary.age = req.body.age;
  salary.gender = req.body.gender;
  salary.notes = req.body.notes;
  salary.save((err, doc) => {
    if (!err) {
      res.redirect("/salary");

    } else {
        console.log("Error during record insertion :" + err);
    }
    }
    );
}

module.exports = router;
module.exports.insertSalary = insertSalary;
