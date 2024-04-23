const exams = require("./examSchema");
const assignmentAns = require("./examSchema");

const jwt = require("jsonwebtoken");

const pgm = require("../courseSchema");
const examQns = require("./examQns");
// const cart = require('../user/cart_model')

//add Assign

const addExam = (req, res) => {
  let date = new Date();
  const newPgm = new exams({
    trainerid: req.body.trainerid,
    description: req.body.description,
    cid: req.body.cid,
    qn1: req.body.qn1,
    qn2: req.body.qn2,
    qn3: req.body.qn3,
    qn4: req.body.qn4,
    qn5: req.body.qn5,
    qn6: req.body.qn6,
    qn7: req.body.qn7,
    qn8: req.body.qn8,
    qn9: req.body.qn9,
    qn10: req.body.qn10,
    qn11: req.body.qn11,
    qn12: req.body.qn12,
    qn13: req.body.qn13,
    qn14: req.body.qn14,
    qn15: req.body.qn15,
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
//exam add -- finished

//View all exams by courseid

const viewExams = (req, res) => {
  exams
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

// view Exams finished

//view assignments by trainer
const viewExamByTrainerId = (req, res) => {
  exams
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

const viewExamById = (req, res) => {
  exams
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

//Remove  Exam by ID

const removeExamById = (req, res) => {
  exams
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
  let flag=0
  await examQns.find({examid: req.body.examid,
    studentid: req.body.studentid}).exec().then(datas=>{
      if(datas.length>0)
      flag=1
    })
if(flag==0){
  const newPgm = new examQns({
    examid: req.body.examid,
    studentid: req.body.studentid,
    cid: req.body.cid,
    ans1: req.body.ans1,
    ans2: req.body.ans2,
    ans3: req.body.ans3,
    ans4: req.body.ans4,
    ans5: req.body.ans5,
    ans6: req.body.ans6,
    ans7: req.body.ans7,
    ans8: req.body.ans8,
    ans9: req.body.ans9,
    ans10: req.body.ans10,
    ans11: req.body.ans11,
    ans12: req.body.ans12,
    ans13: req.body.ans13,
    ans14: req.body.ans14,
    ans15: req.body.ans15,
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
  }else
  {
    res.json({
      status: 500,
      msg: "You have Already attended this Exam"
    })
  }
};

//view pendingAssignments
const viewPendingExamforCourse = (req, res) => {
  examQns
    .find({ cid: req.params.id, valued: false })
    .populate("studentid")
    .populate("examid")
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

const valuateExamById = (req, res) => {
  examQns
    .findByIdAndUpdate(
      { _id: req.params.id },
      {
        valued: true,
        score1: parseFloat(req.body.score1),
        score2: parseFloat(req.body.score2),
        score3: parseFloat(req.body.score3),
        score4: parseFloat(req.body.score4),
        score5: parseFloat(req.body.score5),
        score6: parseFloat(req.body.score6),
        score7: parseFloat(req.body.score7),
        score8: parseFloat(req.body.score8),
        score9: parseFloat(req.body.score9),
        score10: parseFloat(req.body.score10),
        score11: parseFloat(req.body.score11),
        score12: parseFloat(req.body.score12),
        score13: parseFloat(req.body.score13),
        score14: parseFloat(req.body.score14),
        score15: parseFloat(req.body.score15),
        totalscore:
          parseFloat(req.body.score1) +
          parseFloat(req.body.score2) +
          parseFloat(req.body.score3) +
          parseFloat(req.body.score4) +
          parseFloat(req.body.score5) +
          parseFloat(req.body.score6) +
          parseFloat(req.body.score7) +
          parseFloat(req.body.score8) +
          parseFloat(req.body.score9) +
          parseFloat(req.body.score10) +
          parseFloat(req.body.score11) +
          parseFloat(req.body.score12) +
          parseFloat(req.body.score13) +
          parseFloat(req.body.score14) +
          parseFloat(req.body.score15),
        comments: req.body.comments,
      }
    )
    .exec()
    .then((data) => {
      console.log(data);
      res.json({
        status: 200,
        msg: "Data added successfully",
        data:data
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

//view valued exam
const viewValuedExam = (req, res) => {
  examQns
    .find({ cid: req.params.id, valued: true })
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

const viewValuedExamForStudents = (req, res) => {
  examQns
    .find({ cid: req.body.cid, studentid: req.body.studentid, valued: true })
    .populate("examid")
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

const viewValuedExamForStudentsByID = (req, res) => {
  examQns
    .findOne({
      examid: req.params.id,
      studentid: req.body.studentid,
      valued:true
    })
    .populate("studentid")
    .populate("examid")
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


const viewValuedExamForStudentsForProgress = (req, res) => {
  examQns
    .find({studentid: req.params.id, valued: true })
    .populate("studentid")
    .populate("examid")
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
//view Exam for students
const viewExamsforstud = (req, res) => {
  console.log(req.body.studentid);
  examQns
    .find({ studentid: req.body.studentid, cid: req.body.cid })
    .populate("examid")
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
  examQns
    .findOne({ examid: req.params.id })
    .populate("examid")
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
  addAnswers,
  addExam,
  valuateExamById,
  viewExamById,
  viewExamsforstud,
  viewPendingExamforCourse,
  viewAnswersbyId,
  viewValuedExam,
  viewExams,
  viewExamByTrainerId,
  removeExamById,
  viewValuedExamForStudents,
  viewValuedExamForStudentsByID,
  viewValuedExamForStudentsForProgress
};
