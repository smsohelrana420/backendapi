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
        otp
      });
  
      await user.save().then(()=>{
        sendEmail(email,otp)

      //   setTimeout(async () => {
      //  let otpremove= await  userModel.findOneAndUpdate({email},{otp:null},{new:true})
      //  await otpremove.save().then(()=>{
      //   console.log("otp remove");
        
      //  })
      //   }, 60000);
          return res.status(201).json({success:true,message:"user created successfull",data:user});
  
      }).catch((err)=>{
          next(err)
          
      })
};

const verifyOtpController=async(req,res,next)=>{
 let {email,otp}=req.body

 let user=await userModel.findOne({email})

 if(!user){
  return res.status(404).json({success:false,message:"User Not Found"})
 }else{
  if(user.otp === otp){
      let verify=await userModel.findOneAndUpdate({email},{verify:true},{new:true})
      return res.status(200).json({success:true,message:"Otp verify successfull",data:verify})
  }else{
    return res.status(404).json({ success: false, message: "OTP Not Match" });
  }
 }
}
module.exports={singupController,verifyOtpController};