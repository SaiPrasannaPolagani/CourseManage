const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  departmentName: {
    type: String,
    required: true,
  },
});

module.exports = Course = mongoose.model("Course", CourseSchema);
