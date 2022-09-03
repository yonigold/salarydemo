require("./models/db");
const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const cors = require("cors");
const salaryController = require("./controllers/salaryController");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 3001;

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());

app.use(bodyParser.json());

app.set("views", path.join(__dirname, "views"));
app.engine(
  "hbs",
  exphbs.engine({
    extname: "hbs",
    defaultLayout: "mainlayout",
    layoutsDir: path.join(__dirname, "views/layouts"),
    helpers: {
      // each button click will increase the count by 1 
      inc: function (value) {
        return value + 1;
      },
      // each button click will decrease the count by 1
      dec: function (value) {
        return value - 1;
      }
    },
  })
);
app.set("view engine", "hbs");

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});

app.use("/salary", salaryController);
// connect to public css folder
app.use(express.static(path.join(__dirname, "public")));
