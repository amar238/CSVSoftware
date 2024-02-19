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
      enum: ["Pass", "Fail", "On Hold", "No Attempt","Pending"],
      required: true,
      default:"Pending"
    },
  },
  {
    timestamps: true,
  }
);

// combinelly for company and candidate checks unique constraints
resultSchema.index({ company: 1 },{student:1},{ unique: true });
const Result = mongoose.model("Result", resultSchema);
module.exports = Result;
