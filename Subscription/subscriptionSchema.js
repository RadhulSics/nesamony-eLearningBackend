const mongoose= require("mongoose");
    
const Schema=mongoose.Schema({
    stid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'students'
    },
    cid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'courses'
    },
    
    doj:{
        type:Date
    },
    isactive:{
        type:Boolean,
        default:false
    }
});
module.exports=mongoose.model('subscriptions',Schema)

