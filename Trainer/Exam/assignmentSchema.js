const mongoose= require("mongoose");

const Schema=mongoose.Schema({
  
   trainerid:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'trainers'
   },
    endDate:{
        type:Date,
        required:true
    },

    description:{
        type:String,
        required:true
    },
  cid:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'courses'
  },
  qn1:String,
  qn2:String,
  qn3:String,
  qn4:String,
  qn5:String,
});
module.exports=mongoose.model('assignments',Schema)

