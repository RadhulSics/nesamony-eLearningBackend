const mongoose= require("mongoose");

const studentSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    
    course:{
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
    dob:{
        type:Date,
        required:true
    },gender:{
        type:String,
        required:true
    }
});
module.exports=mongoose.model('students',studentSchema)

