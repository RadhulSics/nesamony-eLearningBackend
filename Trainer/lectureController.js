const lectureSchema = require("./lectureSchema");

const multer = require("multer");
// const cart = require('../user/cart_model')

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("lecture");

const upload2 = multer({ storage: storage }).single("video");

// video newses

//add news

const addLecture = (req, res) => {
  let img, video, note;

  lecture = req.file;
  let date = new Date();
  const newNews = new lectureSchema({
    title: req.body.title,
    content: req.body.content,
    date: date,
    tid: req.body.tid,
    cid: req.body.cid,
    lecture: lecture,

    type: req.body.type,
  });
  newNews
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
        msg: "Data not Inserted",
        Error: err,
      });
    });
};

//View all news

const viewLectureReqs = (req, res) => {
  lectureSchema
    .find({ isactive: false })
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
        msg: "Data not Inserted",
        Error: err,
      });
    });
};

//View all v news reqs

const viewAprvdLectures = (req, res) => {
  lectureSchema
    .find({ isactive: true, type: req.body.type })
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
        msg: "Data not Inserted",
        Error: err,
      });
    });
};

//Approve videonews by media
const updateLectureByAdmin = (req, res) => {
  lectureSchema
    .findByIdAndUpdate(
      { _id: req.params.id },
      {
        isactive: true,
      }
    )
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Updated successfully",
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Updated",
        Error: err,
      });
    });
};

const DeleteLecture = (req, res) => {
  lectureSchema
    .findOneAndDelete(
      { _id: req.params.id },
    )
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Updated successfully",
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Updated",
        Error: err,
      });
    });
};
//add video to lecture

//Approve videonews by media
const updateVideoLecture = (req, res) => {
  lectureSchema
    .findByIdAndUpdate(
      { _id: req.params.id },
      {
        video: req.file,
      }
    )
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Updated successfully",
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Updated",
        Error: err,
      });
    });
};

//view Lecture by trainr
const viewLectureByTrainer = (req, res) => {
  lectureSchema
    .find({ tid: req.params.tid, isactive: true })
    .sort({ date: -1 })
    .exec()
    .then((data) => {
      if (data.length > 0) {
        console.log(data);
        res.json({
          status: 200,
          msg: "Data obtained successfully",
          data: data,
        });
      } else {
        res.json({
          status: 500,
          msg: "No Data obtained",
        });
      }
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
//view    by id

const viewLectureById = (req, res) => {
  lectureSchema
    .findOne({ _id: req.params.id })
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
//delelte Lecture

const delLectureById = (req, res) => {
  lectureSchema
    .findOneAndDelete({ _id: req.params.id })
    .exec()
    .then((data) => {
      console.log(data);
      res.json({
        status: 200,
        msg: "Data removed successfully",
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

//view Lecture by course id
const viewLectureByCourse = (req, res) => {
  lectureSchema
    .find({ cid: req.params.id, isactive: true })
    .sort({ date: -1 })
    .exec()
    .then((data) => {
      if (data.length > 0) {
        console.log(data);
        res.json({
          status: 200,
          msg: "Data obtained successfully",
          data: data,
        });
      } else {
        res.json({
          status: 500,
          msg: "No Data obtained",
        });
      }
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

//view Lecture by couse type
const viewLectureByCourseType = (req, res) => {
  lectureSchema
    .find({ cid: req.params.id, isactive: true, type: req.body.type })
    .sort({ date: -1 })
    .exec()
    .then((data) => {
      if (data.length > 0) {
        console.log(data);
        res.json({
          status: 200,
          msg: "Data obtained successfully",
          data: data,
        });
      } else {
        res.json({
          status: 500,
          msg: "No Data obtained",
        });
      }
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

// add reviews by student
const addReview = (req, res) => {
  let review = req.body.review;
  let arr = [];
  lectureSchema
    .findById({ _id: req.params.id })
    .exec()
    .then((data) => {
      arr = data.reviews;
      arr.push(review);
      console.log(arr);
      lectureSchema
        .findByIdAndUpdate(
          { _id: req.params.id },
          {
            reviews: arr,
          }
        )
        .exec()
        .then((data) => {
          res.json({
            status: 200,
            msg: "Data obtained successfully",
            data: data,
          });
        })
        .catch((err) => {
          res.json({
            status: 500,
            msg: "Data not Inserted",
            Error: err,
          });
        });
    });
};

module.exports = {
  addLecture,
  viewLectureById,
  upload2,
  upload,
  viewAprvdLectures,
  delLectureById,
  viewLectureReqs,
  viewLectureByTrainer,
  updateLectureByAdmin,
  DeleteLecture,
  updateVideoLecture,
  addReview,
  viewLectureByCourse,
  viewLectureByCourseType,
};
