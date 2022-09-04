require("./models/db");
const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const cors = require("cors");
const salaryController = require("./controllers/salaryController");
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const port = process.env.PORT || 3000;


const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


app.set("views", path.join(__dirname, "views"));
app.engine(
  "hbs",
  exphbs.engine({
    extname: "hbs",
    defaultLayout: "mainlayout",
    layoutsDir: path.join(__dirname, "views/layouts"),
    
    },
  )
);
app.set("view engine", "hbs");

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});

app.use("/salary", salaryController);
// connect to public css folder
app.use(express.static(path.join(__dirname, "public")));
