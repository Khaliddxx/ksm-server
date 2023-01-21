const express = require("express");
const Project = require("../model/ProjectCard");
const HttpError = require("../middleware/http-error");
const router = express.Router();

// Get all projects
router.get("/", async (req, res) => {
  const projects = await Project.find();
  res.send(projects);
});

// Create a project
router.post("/create", async (req, res, next) => {
  console.log(req.body);
  let { name, category, donor, date, mainImg, description, price } = req.body;

  let existingProject;
  try {
    existingProject = await Project.findOne({
      name: name,
      donor: donor,
    });
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Creating project failed, please try again later.",
      500
    );
    return next(error);
  }

  if (existingProject) {
    // console.log(existingUsers)
    const error = new HttpError(
      "Project already exists, please try again.",
      422
    );
    return next(error);
  }
  console.log("2");

  try {
    createdProject = new Project({
      name,
      category,
      donor,
      date,
      mainImg,
      description,
      price,
    });
    await createdProject.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Creating project failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ project: createdProject });
});

// Get project by id
// router.get(`/:id`, async (req, res) => {
//   const project = await Project.find({ _id: id });
//   res.send(project);
// });

router.get("/:id", async (req, res, next) => {
  let project;
  const id = req.params.id;
  console.log(id);
  try {
    project = await Project.find({ _id: id });
  } catch (err) {
    const error = new HttpError(
      "Fetching Project failed, please try again later.",
      500
    );
    console.log(err);
    return next(error);
  }
  res.json({
    project: project,
  });
});

module.exports = router;
