const studentSchema = require("../Student/studentSchema");
const courseSchema = require("../Trainer/courseSchema");
let subscriptionSchema = require("./subscriptionSchema");

//subscribe a pgm

const subscribePgm = (req, res) => {
  let date = new Date();
  const subscription = new subscriptionSchema({
    stid: req.body.stid,
    doj: date,
    cid: req.body.cid,
  });
  subscription
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

// payment  for subscription

const updatePaymentBySid = (req, res) => {
  subscriptionSchema
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


const Unsubscribe = (req, res) => {
  subscriptionSchema
    .findByIdAndDelete({ _id: req.params.id })
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Unsubscribed successfully",
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


//View my subscriptions

const viewSubscriptionsByCId = (req, res) => {
  subscriptionSchema
    .find({ stid: req.params.id, isactive: true })
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

// add rating to mentor by  cid
const addRating = (req, res) => {
  let newRate = parseInt(req.body.rating);
  let rating = 0;
  courseSchema
    .findById({ _id: req.params.id })
    .exec()
    .then((data) => {
      rating = data.rating;
      if (data.rating != 0) rating = (rating + newRate) / 2;
      else rating = newRate;
      console.log(rating);
      courseSchema
        .findByIdAndUpdate(
          { _id: req.params.id },
          {
            rating: rating,
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

//View my unsub pgms

const viewUnSubscriptionsByCId = async (req, res) => {
  const studentId = req.params.id;
  let student = [];

  // Find the student document by ID
  await subscriptionSchema
    .find({ stid: req.params.id })
    .exec()
    .then((data) => {
      console.log(data);
      student = data;
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    });

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  //   // Get the subscribed course IDs for the student
  const subscribedCourseIds = student.map((subscription) => subscription.cid);
  console.log("subscribedCourseIds", subscribedCourseIds);

  //   // Find the unsubscribed courses
  const unsubscribedCourses = await courseSchema.find({
    _id: { $nin: subscribedCourseIds },
  });
  console.log("unsubscribedCourses", unsubscribedCourses);
  if (unsubscribedCourses) {
    res.json({
      status: 200,
      msg: "got data",
      data: unsubscribedCourses,
    });
  } else {
    res.json({
      status: 500,
      msg: "no data found",
    });
  }
};

// vie w subscriptions for Trainer by trainer id
const viewMysubscriptions = (req, res) => {
  subscriptionSchema
    .find({ trainerid: req.body.id, isactive: true })
    .populate("pid")
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
  subscribePgm,
  viewUnSubscriptionsByCId,
  viewMysubscriptions,
  viewSubscriptionsByCId,
  addRating,
  updatePaymentBySid,
  Unsubscribe
};
