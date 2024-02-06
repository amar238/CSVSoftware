const mongoose = require("mongoose");

const courseScoresSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    dsa: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
      default:0
    },
    webD: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
      default:0
    },
    react: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
      default:0
    },
  },
  {
    timestamps: true,
  }
);

const CourseScore = mongoose.model("CourseScore", courseScoresSchema);
module.exports = CourseScore;
