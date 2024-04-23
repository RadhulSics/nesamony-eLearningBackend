const mongoose= require("mongoose");

const Schema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    
    
  
    email:{
        type:String,
        unique:true,
        required:true,
       
        dropDups: true
    },
    password:{
        type:String,
        required:true
    },
    studEmail:{
        type:Array,
        required:true

    },
    stid:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'students'
    }]
});
module.exports=mongoose.model('parents',Schema)

