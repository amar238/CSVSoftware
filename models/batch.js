const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema(
  {
    year: {
      type: Number,
      required: true,
      min: 2020,
      max: new Date().getFullYear() + 1 , // Current year +1 as the maximum value
    },
    month: {
      type: String,
      required: true,
      enum: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",  
        "November",
        "December",
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Batch = mongoose.model("Batch", batchSchema);
module.exports = Batch;
