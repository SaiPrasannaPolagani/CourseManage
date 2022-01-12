const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const db = require("./config/key").mongoURI;
const course = require("./routes/api/courseroute");
const exphbs = require("express-handlebars");
const path = require("path");

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.set("views", path.join(__dirname, "/views/"));
app.engine(
  "handlebars",
  exphbs({
    extname: "handlebars",
    defaultLayout: "main",
    layoutsDir: __dirname + "/views/layout/",
  })
);
app.set("view engine", "handlebars");

//connect to mongodb
mongoose
  .connect(db)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

//route
app.use("/api/courses", course);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Sever running on port ${port}`));
