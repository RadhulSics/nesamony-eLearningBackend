const studentSchema = require("../Student/studentSchema");
const subscriptionSchema = require("../Subscription/subscriptionSchema");
const courseSchema = require("../Trainer/courseSchema");
let chat = require("./chatSchema");

//chatting

const createChat = (req, res) => {
  let date = new Date();
  const newChat = new chat({
    pid: req.body.pid,
    date: date,
    trid: req.body.trid,
    from: req.body.from,
    msg:req.body.msg,
    stid:req.body.stid
  });
  newChat
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

const viewChatForTrwithParent = (req, res) => {
  chat
    .find({ pid: req.body.pid, trid: req.body.trid })
    .populate("pid")
    .populate("trid")
    .sort({ date: +1 })
    .exec()
    .then((data) => {
      res.json({
        statu: 200,
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        err: err,
      });
    });
};

const viewChatForTrwithStudent = (req, res) => {
  chat
    .find({ stid: req.body.stdid, trid: req.body.trid })
    .populate("stid")
    .populate("trid")
    .sort({ date: +1 })
    .exec()
    .then((data) => {
      res.json({
        statu: 200,
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        err: err,
      });
    });
};

const viewTrainersforparent = async (req, res) => {
  let stid,
    trainers = [],
    cid = [];
  await studentSchema
    .findOne({ studEmail: req.body.studEmail })
    .then((data) => {
      stid = data._id;
      console.log("tid", stid);
    })
    .catch((err) => {
      res.json({
        status: 500,
        err: err,
      });
    });

  await subscriptionSchema
    .find({ stid: stid })
    .then((data1) => {
      data1.map((x) => {
        cid.push(x.cid);
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        err: err,
      });
    });
  console.log("course", cid);

  await courseSchema
    .find({ _id: { $in: cid } })
    .then((data2) => {
      // trainers.push(data2.trainerid)
      data2.map((x) => {
        trainers.push(x.trainerid);
      });
      console.log("tr", trainers);
    })
    .catch((err) => {
      res.json({
        status: 500,
        err: err,
      });
    });
  res.json({
    status: 200,
    err: trainers,
  });
};

const viewParentssforTr = async (req, res) => {
  const arr = [];
  await chat
    .distinct("pid", { trid: req.params.id })
    .exec()
    .then((data) => {
      console.log("datas", data);
      arr.push(data);
      res.json({
        status: 200,
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        err: err,
      });
    });
};


const viewStudentsforTr = async (req, res) => {
  let arr = [];
  await chat
    .distinct("stid", { trid: req.params.id })
    .exec()
    .then((data) => {
      if(data.lentgh>0){
      console.log("datas", data);
      arr.push(data);
      }
      res.json({
        status: 200,
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        err: err,
      });
    });
};
module.exports = {
  createChat,
  viewChatForTrwithParent,
  viewChatForTrwithStudent,
  viewTrainersforparent,
  viewParentssforTr,
  viewStudentsforTr
};
