const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    pos: {
      type: String,
      required: true,
    },
    interview_date: {
      type: Date,
      required: true,
    },
    students:[
        {
          type: mongoose.Schema.Types.ObjectId,
          ref : 'Student',
          unique: true
        }]
  },
  {
    timestamps: true,
  }
);

companySchema.index({ name: 1 },{pos:1},{ unique: true });
const Company = mongoose.model("Company", companySchema);
module.exports = Company;
