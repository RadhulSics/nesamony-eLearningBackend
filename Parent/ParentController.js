const parents = require("./parentSchema");
const studentSchema = require("../Student/studentSchema");
const jwt = require("jsonwebtoken");

const secret = "your-secret-key"; // Replace this with your own secret key

const createToken = (user) => {
  return jwt.sign({ userId: user._id }, secret, { expiresIn: "1h" });
};

//parent Registration

const registerParent = async (req, res) => {
  // let std=''
  let studmail = req.body.studmail;
  let stid = [];
  console.log(studmail);
  for (let i = 0; i < studmail.length; i++) {
    console.log("eme", studmail[i]);
    await studentSchema
      .findOne({ email: studmail[i] })
      .exec()
      .then((data) => {
        console.log("data", data);
        stid.push(data._id);
      });
  }
  console.log("stid", stid);
  const newStudent = new parents({
    name: req.body.name,
    email: req.body.email,
    stid: stid,
    password: req.body.password,
    studEmail: studmail,
  });
  await newStudent
    .save()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Inserted successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err,
      });
    });
};
//Parent Registration -- finished

//Login Parent
const login = (req, res) => {
  const { email, password } = req.body;

  parents
    .findOne({ email })
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      if (user.password != password) {
        return res.status(500).json({ msg: "incorrect pwd" });
      }

      const token = createToken(user);

      res.status(200).json({ user, token });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ msg: "Something went wrong" });
    });
};
//validate

const requireAuth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  console.log("t1", token);
  console.log("secret", secret);
  if (!token) {
    return res.status(401).json({ msg: "Unauthorized" });
  }
  jwt.verify(token, secret, (err, decodedToken) => {
    console.log(decodedToken);
    if (err) {
      return res.status(401).json({ messamsgge: "Unauthorized", err: err });
    }

    req.user = decodedToken.userId;
    next();
    return res.status(200).json({ msg: "ok", user: decodedToken.userId });
  });
  console.log(req.user);
};

//Login Parent --finished

//View all Parents

const viewParents = (req, res) => {
  parents
    .find()
    .populate("stid")
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

// view Parents finished

//update Parent by id
const editParentById = async (req, res) => {
  await studentSchema.findOne({ email: req.body.studEmail }).exec((data) => {
    stid = data._id;
  });

  parents
    .findByIdAndUpdate(
      { _id: req.params.id },
      {
        name: req.body.name,
        gender: req.body.gender,
        stid: stid,
        course: req.body.course,
        email: req.body.email,
        dob: req.body.dob,
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
      console.log(err);
      res.json({
        status: 500,
        msg: "Data not Updated",
        Error: err,
      });
    });
};

//View  Student by ID

const viewParentById = (req, res) => {
  parents
    .findOne({ _id: req.params.id })
    .populate("stid")
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

//Student forgot password
const forgotPassword = (req, res) => {
  parents
    .findOne({ email: req.body.email })
    .exec()
    .then((data) => {
      if (data == null) {
        res.json({
          status: 500,
          msg: "User not Found",
        });
      } else {
        parents
          .findOneAndUpdate(
            { email: req.body.email },
            {
              password: req.body.password,
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
      }
    });
};

// view Parent by id
const deleteParentById = (req, res) => {
  parents
    .findByIdAndDelete({ _id: req.params.id })
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
};

module.exports = {
  registerParent,
  login,
  viewParentById,
  editParentById,
  viewParents,
  deleteParentById,
  forgotPassword,
};
