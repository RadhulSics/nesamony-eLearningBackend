const trainer = require("./trainerSchema");
const jwt = require("jsonwebtoken");

const pgm = require("./courseSchema");
// const cart = require('../user/cart_model')

//add pgm

const addCourse = (req, res) => {
  let date = new Date();
  const newPgm = new pgm({
    title: req.body.title,
    category: req.body.category,
    cost: req.body.cost,
    trainerid: req.params.id,
    description: req.body.description,
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
//pgm Registration -- finished

//View all tutorials

const viewPgms = (req, res) => {
  pgm
    .find({ isactive: true })
    .populate('trainerid')
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

// view tutorials finished

//view pgm by trainer
const viewPgmByTrainerId = (req, res) => {
  pgm
    .find({ isactive: true, trainerid: req.params.id })
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
//View  pgm by ID

const viewPgmById = (req, res) => {
  pgm
    .findbyId({ _id: req.params.id })
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

const removePgmById = (req, res) => {
  pgm
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

//View all  tutorial requests

const viewPgmRequests = (req, res) => {
  pgm
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
//trainer Approval by admin
const Approvepgm = (req, res) => {
  pgm
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


const DeletePGM = (req, res) => {
  pgm
    .findByIdAndDelete(
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

// add rating to m
const addRating = (req, res) => {
  let newRate = parseInt(req.body.rating);
  let rating = 0;
  pgm
    .findById({ _id: req.params.id })
    .exec()
    .then((data) => {
console.log(data);
      rating = data.rating;
      if (data.rating != 0) rating = (rating + newRate) / 2;
      else rating = newRate;
      console.log(rating);
      pgm
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

module.exports = {
  addCourse,
  viewPgmById,
  viewPgms,
  removePgmById,
  viewPgmByTrainerId,
  viewPgmRequests,
  Approvepgm,
  DeletePGM,
  addRating,
};
