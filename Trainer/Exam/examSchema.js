const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  trainerid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "trainers",
  },
  description: {
    type: String,
    required: true,
  },
  cid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "courses",
  },
  qn1: String,
  qn2: String,
  qn3: String,
  qn4: String,
  qn5: String,
  qn6: String,
  qn7: String,
  qn8: String,
  qn9: String,
  qn10: String,
  qn11: String,
  qn12: String,
  qn13: String,
  qn14: String,
  qn15: String,
});
module.exports = mongoose.model("exams", Schema);
