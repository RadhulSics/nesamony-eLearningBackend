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
    gender:{
        type:String,
        required:true
    },
     experience:{
        type:String,
        required:true
    },
    qualification:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        default:0
    }
});
module.exports=mongoose.model('trainers',Schema)

