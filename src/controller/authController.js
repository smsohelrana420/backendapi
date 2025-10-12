const userModel = require("../model/signup.model");
const sendEmail = require("../utils/email_send");
const generateOTP = require("../utils/otp");

const singupController=async (req,res,next)=>{
    let {name,email,password,phone,image,role} =req.body;
    let otp=generateOTP()
   
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
        sendEmail(email,otp)
          return res.status(201).json({success:true,message:"user created successfull",data:user});
  
      }).catch((err)=>{
          next(err)
          
      })
};
module.exports={singupController};