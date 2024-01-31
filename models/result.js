const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    result: {
      type: String,
      enum: ["Pass", "Fail", "On Hold", "No Attempt","Upcoming"],
      required: true,
      default: "Upcoming",
    },
  },
  {
    timestamps: true,
  }
);

const Result = mongoose.model("Result", resultSchema);
module.exports = Result;
