require("./models/db");
const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const cors = require("cors");

const salaryController = require("./controllers/salaryController");




const app = express();


app.use(
    bodyParser.urlencoded({
      extended: true,}));

app.use(cors());

app.use(bodyParser.json());


app.set("views", path.join(__dirname, "views"));
app.engine(
    "hbs",
    exphbs.engine({
        extname: "hbs",
        defaultLayout: "mainlayout",
        layoutsDir: path.join(__dirname, "views/layouts"),
    })
);
app.set("view engine", "hbs");





app.listen(3001, () => {
  console.log("Server is running on port 3000");
});

app.use("/salary", salaryController);
app.use("/", express.static(path.join(__dirname, "public")));
