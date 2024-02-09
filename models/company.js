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
          ref : 'Student'
        }]
  },
  {
    timestamps: true,
  }
);

// combinelly for company name and position checks unique constraints
companySchema.index({ name: 1 },{pos:1},{ unique: true });
const Company = mongoose.model("Company", companySchema);
module.exports = Company;
