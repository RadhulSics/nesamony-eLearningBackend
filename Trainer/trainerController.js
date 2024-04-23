

const trainers=require('./trainerSchema')
const jwt=require('jsonwebtoken')

const secret = 'your-secret-key'; // Replace this with your own secret key

const createToken = (user) => {
  return jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });
};


//Trainer Registration 

const registerTrainer=(req,res)=>{
    const newTrainer=new trainers({
        name:req.body.name,
        gender:req.body.gender,
        course:req.body.course,
        email:req.body.email,
        password:req.body.password,
        experience:req.body.experience,
        qualification:req.body.qualification
    })
    newTrainer.save().then(data=>{
        res.json({
            status:200,
            msg:"Inserted successfully",
            data:data
        })
    }).catch(err=>{
      console.log(err);
        res.json({
            status:500,
            msg:"Data not Inserted",
            Error:err
        })
    })
}
//newTrainer Registration -- finished





//Login customer 
const login = (req, res) => {
  
  const { email, password } = req.body;

  trainers.findOne({ email }).exec().then (user => {
   

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

      if (user.password!=password) {
        return res.status(500).json({ msg:'incorrect pwd' });
      }

    
      const token = createToken(user);

      res.status(200).json({ user, token });
    })
    .catch(err=>{
      console.log(err);
        return res.status(500).json({ msg: 'Something went wrong' });
      
    })
  
};
//validate


const requireAuth = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  console.log("t1",token);
  console.log("secret",secret);
  if (!token) {
    return res.status(401).json({ msg: 'Unauthorized' });
  }
  jwt.verify(token, secret, (err, decodedToken) => {
    console.log(decodedToken);
    if (err) {
      return res.status(401).json({ messamsgge: 'Unauthorized' ,err:err});
    }

    req.user = decodedToken.userId;
    next();
    return res.status(200).json({ msg: 'ok' ,user:decodedToken.userId});
  });
  console.log(req.user);
};

//Login Trainer --finished



//View all Trainers

const viewTrainers=(req,res)=>{
  trainers.find().exec()
  .then(data=>{
    if(data.length>0){
    res.json({
        status:200,
        msg:"Data obtained successfully",
        data:data
    })
  }else{
    res.json({
      status:200,
      msg:"No Data obtained "
  })
  }
}).catch(err=>{
    res.json({
        status:500,
        msg:"Data not Inserted",
        Error:err
    })
})

}

// view Trainers finished


//update Trainer by id
const editTrainerById=(req,res)=>{

  
    
  trainers.findByIdAndUpdate({_id:req.params.id},{
    name:req.body.name,
        gender:req.body.gender,
        course:req.body.course,
        email:req.body.email,
        password:req.body.password,
        experience:req.body.experience,
        qualification:req.body.qualification
    })
.exec().then(data=>{
  res.json({
      status:200,
      msg:"Updated successfully"
  })
}).catch(err=>{
  console.log(err);
  res.json({
      status:500,
      msg:"Data not Updated",
      Error:err
  })
})
}

//View  Trainer by ID

const viewTrainerById=(req,res)=>{
  trainers.findOne({_id:req.params.id}).exec()
  .then(data=>{

    console.log(data);
    res.json({
        status:200,
        msg:"Data obtained successfully",
        data:data
    })
  
}).catch(err=>{
  console.log(err);
    res.json({
        status:500,
        msg:"No Data obtained",
        Error:err
    })
})

}

//Student forgot password
const forgotPassword=(req,res)=>{
  trainers.findOne({email:req.body.email}).exec()
  .then(data=>{
    if(data==null){
      res.json({
        status:500,
        msg:"User not Found"
    })
    }
    else{
      trainers.findOneAndUpdate({email:req.body.email},{
        password:req.body.password
      }).exec().then(data=>{
        res.json({
          status:200,
          msg:"Updated successfully"
      })
    }).catch(err=>{
      res.json({
          status:500,
          msg:"Data not Updated",
          Error:err
      })
    })
    }
  })
}


// view Trainer by id
const deleteTrainerById=(req,res)=>{
  trainers.findByIdAndDelete({_id:req.params.id}).exec()
  .then(data=>{
    
    res.json({
        status:200,
        msg:"Data obtained successfully",
        data:data
    })
  
}).catch(err=>{
    res.json({
        status:500,
        msg:"Data not Inserted",
        Error:err
    })
})

}


// add rating to tariner by  
const addRating=(req,res)=>{
  let newRate=req.body.rating
  let rating=0
  trainers.findById({_id:req.params.id}).exec()
  .then(data=>{
    rating=data.rating
    if(data.rating!=0)
  rating=(rating+newRate)/2
  else
  rating=newRate
  console.log(rating);
  trainers.findByIdAndUpdate({_id:req.params.id},{
    rating:rating
  }).exec()
  .then(data=>{
    
    res.json({
        status:200,
        msg:"Data obtained successfully",
        data:data
    })
  
}).catch(err=>{
    res.json({
        status:500,
        msg:"Data not Inserted",
        Error:err
    })
})
})
}

module.exports={registerTrainer,login,viewTrainerById,editTrainerById,
  deleteTrainerById,forgotPassword,viewTrainers,addRating}