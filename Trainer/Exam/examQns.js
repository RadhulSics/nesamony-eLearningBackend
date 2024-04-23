const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  examid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "exams",
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
  ans6: String,
  score6: {
    type: Number,
    default: 0,
  },
  ans7: String,
  score7: {
    type: Number,
    default: 0,
  },
  ans8: String,
  score8: {
    type: Number,
    default: 0,
  },
  ans9: String,
  score9: {
    type: Number,
    default: 0,
  },
  ans10: String,
  score10: {
    type: Number,
    default: 0,
  },
  ans11: String,
  score11: {
    type: Number,
    default: 0,
  },
  ans12: String,
  score12: {
    type: Number,
    default: 0,
  },
  ans13: String,
  score13: {
    type: Number,
    default: 0,
  },
  ans14: String,
  score14: {
    type: Number,
    default: 0,
  },
  ans15: String,
  score15: {
    type: Number,
    default: 0,
  },
  totalscore: {
    type: Number,
    default: 0,
  },
  comments: String,
});
module.exports = mongoose.model("examanswers", Schema);
