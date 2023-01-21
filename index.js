require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const projectRoutes = require("./routes/ProjectCard");

const HttpError = require("./middleware/http-error");

const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization,*"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/projects", projectRoutes);
// last route
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  console.log(error);
  throw error;
});

mongoose
  .connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT || 3001, () => {
      console.log("Server Started");
      console.log(`Running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
