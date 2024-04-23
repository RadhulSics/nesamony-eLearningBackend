const assignments = require("./assignmentSchema");
const assignmentAns = require("./assignmentAns");

const jwt = require("jsonwebtoken");

const pgm = require("../courseSchema");
// const cart = require('../user/cart_model')

//add Assign

const addAssignment = (req, res) => {
  let date = new Date();
  const newPgm = new assignments({
    trainerid: req.body.trainerid,
    endDate: req.body.endDate,
    description: req.body.description,
    cid: req.body.cid,
    qn1: req.body.qn1,
    qn2: req.body.qn2,
    qn3: req.body.qn3,
    qn4: req.body.qn4,
    qn5: req.body.qn5,
    date: date,
  });
  newPgm
    .save()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Inserted successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Please enter all the mandatory fields",
        Error: err,
      });
    });
};
//Assign add -- finished

//View all assignments

const viewAssignments = (req, res) => {
  assignments
    .find({ cid: req.params.id })
    .exec()
    .then((data) => {
      if (data.length > 0) {
        res.json({
          status: 200,
          msg: "Data obtained successfully",
          data: data,
        });
      } else {
        res.json({
          status: 200,
          msg: "No Data obtained ",
        });
      }
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not obtained",
        Error: err,
      });
    });
};

// view assignments finished

//view assignments by trainer
const viewAssignmentByTrainerId = (req, res) => {
  assignments
    .find({ trainerid: req.params.id })
    .populate("cid")
    .exec()
    .then((data) => {
      if (data.length > 0) {
        res.json({
          status: 200,
          msg: "Data obtained successfully",
          data: data,
        });
      } else {
        res.json({
          status: 200,
          msg: "No Data obtained ",
        });
      }
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not obtained",
        Error: err,
      });
    });
};
//View  Asignment by ID

const viewAssignmentById = (req, res) => {
  assignments
    .findById({ _id: req.params.id })
    .populate("cid")
    .populate("trainerid")
    .exec()
    .then((data) => {
      console.log(data);
      res.json({
        status: 200,
        msg: "Data obtained successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "No Data obtained",
        Error: err,
      });
    });
};

//Remove  pgm by ID

const removeAssignmentById = (req, res) => {
  assignments
    .findByIdAndDelete({ _id: req.params.id })
    .exec()
    .then((data) => {
      console.log(data);
      res.json({
        status: 200,
        msg: "Data removed  successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "No Data obtained",
        Error: err,
      });
    });
};

//add Assign

const addAnswers = async (req, res) => {
  let date = new Date();
  let flag = 0;
  await assignments
    .findById({ _id: req.body.assign_id })
    .exec()
    .then((data) => {
      exp = data.endDate;
    });

  await assignmentAns
    .find({ _id: req.body.assign_id, studentid: req.body.studentid })
    .exec()
    .then((datas) => {
      if (datas.length > 0) {
        flag = 1;
      }
    })
    .catch((err) => {
      console.log(err);
    });
  if (flag == 0) {
    const newPgm = new assignmentAns({
      assign_id: req.body.assign_id,
      studentid: req.body.studentid,
      cid: req.body.cid,
      ans1: req.body.ans1,
      // score1: req.body.score1,
      ans2: req.body.ans2,
      // score2: req.body.score2,
      ans3: req.body.ans3,
      // score3: req.body.score3,
      ans4: req.body.ans3,
      // score4: req.body.score3,
      ans5: req.body.ans3,
      // score5: req.body.score3,
    });
    if (exp >= date) {
      await newPgm
        .save()
        .then((data) => {
          res.json({
            status: 200,
            msg: "Inserted successfully",
            data: data,
          });
        })
        .catch((err) => {
          res.json({
            status: 500,
            msg: "Please enter all the mandatory fields",
            Error: err,
          });
        });
    } else {
      res.json({
        status: 500,
        msg: "Date Over!!!",
      });
    }
  } else {
    res.json({
      status: 500,
      msg: "You Have already attended this Assignment!!!",
    });
  }
};
//view pendingAssignments
const viewPendingAssignment = (req, res) => {
  assignmentAns
    .find({ cid: req.params.id, valued: false })
    .populate("studentid")
    .populate("assign_id")
    .exec()
    .then((data) => {
      console.log(data);
      res.json({
        status: 200,
        msg: "Data obtained successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "No Data obtained",
        Error: err,
      });
    });
};

//valuation

const valuateAssignmentById = (req, res) => {
  assignmentAns
    .findByIdAndUpdate(
      { _id: req.params.id },
      {
        valued: true,
        score1: parseFloat(req.body.score1),
        score2: parseFloat(req.body.score2),
        score3: parseFloat(req.body.score3),
        score4: parseFloat(req.body.score4),
        score5: parseFloat(req.body.score5),
        totalscore:
          parseFloat(req.body.score1) +
          parseFloat(req.body.score2) +
          parseFloat(req.body.score3) +
          parseFloat(req.body.score4) +
          parseFloat(req.body.score5),
        comments: req.body.comments,
      }
    )
    .exec()
    .then((data) => {
      console.log(data);
      res.json({
        status: 200,
        msg: "Data added successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "No Data obtained",
        Error: err,
      });
    });
};

//view valued Assignments
const viewValuedAssignment = (req, res) => {
  assignmentAns
    .find({ assign_id: req.params.id, valued: true })
    .populate("studentid")
    .populate("assign_id")
    .exec()
    .then((data) => {
      console.log(data);
      res.json({
        status: 200,
        msg: "Data obtained successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "No Data obtained",
        Error: err,
      });
    });
};

const viewValuedAssignmentForStudents = (req, res) => {
  assignmentAns
    .find({ cid: req.body.cid, studentid: req.body.studentid, valued: true })
    .populate("studentid")
    .populate("assign_id")
    .exec()
    .then((data) => {
      console.log(data);
      res.json({
        status: 200,
        msg: "Data obtained successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "No Data obtained",
        Error: err,
      });
    });
};
const viewValuedAssignmentForStudentsByID = (req, res) => {
  assignmentAns
    .findOne({
      assign_id: req.params.id,
      studentid: req.body.studentid,
      valued: true,
    })
    .populate("studentid")
    .populate("assign_id")
    .exec()
    .then((data) => {
      console.log(data);
      res.json({
        status: 200,
        msg: "Data obtained successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "No Data obtained",
        Error: err,
      });
    });
};

const viewValuedAssignmentForStudentsForProgress = (req, res) => {
  assignmentAns
    .find({ studentid: req.params.id, valued: true })
    .populate("studentid")
    .populate("assign_id")
    .populate("cid")

    .exec()
    .then((data) => {
      console.log(data);
      res.json({
        status: 200,
        msg: "Data obtained successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "No Data obtained",
        Error: err,
      });
    });
};

//view assignment for students
const viewAssignmentsforstud = (req, res) => {
  assignmentAns
    .find({ studentid: req.body.studentid, cid: req.body.cid })
    .populate("assign_id")
    .exec()
    .then((data) => {
      console.log(data);
      res.json({
        status: 200,
        msg: "Data obtained successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "No Data obtained",
        Error: err,
      });
    });
};

//view Answers by id
const viewAnswersbyId = (req, res) => {
  assignmentAns
    .findOne({ assign_id: req.params.id, studentid:req.params.studentid})
    .populate("studentid")
    .populate("cid")
    .exec()
    .then((data) => {
      console.log(data);
      res.json({
        status: 200,
        msg: "Data obtained successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "No Data obtained",
        Error: err,
      });
    });
};

module.exports = {
  addAssignment,
  viewAssignmentById,
  viewAssignmentByTrainerId,
  removeAssignmentById,
  viewAssignments,
  addAnswers,
  valuateAssignmentById,
  viewAnswersbyId,
  viewValuedAssignment,
  viewPendingAssignment,
  viewAssignmentsforstud,
  viewValuedAssignmentForStudents,
  viewValuedAssignmentForStudentsByID,
  viewValuedAssignmentForStudentsForProgress,
};
