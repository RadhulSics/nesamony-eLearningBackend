const mongoose= require("mongoose");
    
const Schema=mongoose.Schema({
    pid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'parents'
    },
    stid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'students'
    },
    trid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'trainers',
        required:true
    },
    from:String,
    msg:String,
    date:{
        type:Date
    },
    isactive:{
        type:Boolean,
        default:true
    }
});
module.exports=mongoose.model('chats',Schema)

