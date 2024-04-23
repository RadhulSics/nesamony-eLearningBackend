const mongoose= require("mongoose");

const nSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    tid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'trainers',
        required:true
    },
    cid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'courses',
        required:true
    },
    isactive:{
        type:Boolean,
        default:false
    },
    lecture:Object
   ,reviews:{
    type:Array
},
content:{
    type:String
}

});
module.exports=mongoose.model('lectures',nSchema)

