const userModel = require("../model/signup.model");

const singupController=async (req,res,next)=>{
    let {name,email,password,phone,image,role} =req.body;

   
      // Store hash in your password DB.
      let user = new userModel({
        name,
        email,
        password,
        phone,
        image,
        role,
      });
  
      await user.save().then(()=>{
          return res.status(201).json({success:true,message:"user created successfull",data:user});
  
      }).catch((err)=>{
          next(err)
          
      })
};
module.exports={singupController};