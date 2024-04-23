const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  assign_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "assignments",
  },
  studentid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "students",
  },
  cid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "courses",
  },
  valued: {
    type: Boolean,
    default: false,
  },
  ans1: String,
  score1: {
    type: Number,
    default: 0,
  },
  ans2: String,
  score2: {
    type: Number,
    default: 0,
  },
  ans3: String,
  score3: {
    type: Number,
    default: 0,
  },
  ans4: String,
  score4: {
    type: Number,
    default: 0,
  },
  ans5: String,
  score5: {
    type: Number,
    default: 0,
  },
  totalscore: {
    type: Number,
    default: 0,
  },
  comments: String,
});
module.exports = mongoose.model("assignmentsanswers", Schema);
