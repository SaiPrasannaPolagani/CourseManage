const express = require("express");
const router = express.Router();
const course = require("../../model/Course");

router.get("/", (req, res) => {
  res.render("course/modify", { showTitle: "Add Course" });
});

router.post("/", (req, res) => {
  if (req.body._id) {
    insertData(req, res);
  } else {
    updateData(req, res);
  }
});

const insertData = (req, res) => {
  const details = new course();
  details.courseName = req.body.courseName;
  details.departmentName = req.body.departmentName;
  details.save((err, data) => {
    res.redirect("courses/list");
  });
};

router.get("/list", (req, res) => {
  course.find((err, data) => {
    res.render("course/list", {
      list: data,
    });
  });
});

router.get("/:id", (req, res) => {
  course.findById(req.params.id, (err, data) => {
    res.render("course/modify", {
      showTitle: "Update Details",
      course: data,
    });
  });
});

const updateData = (req, res) => {
  course.findByIdAndUpdate({ _id: req.body._id }, req.body, (err, data) => {
    res.render("course/list");
  });
};

router.get("/delete:id", (req, res) => {
  course.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect("/courses/list");
  });
});

module.exports = router;
