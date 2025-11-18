const couponModel = require("../model/coupon.model");

const createCouponController=async(req,res)=>{
 

    try {
          let {code,minPrice,amount}=req.body
          

          let coupon =new couponModel({
            code,
            minPrice,
            amount
          })
          await coupon.save()
               

                return res.status(201).json({success:true,message:"coupon created successfull",data:coupon})
    } catch (error) {
        return res.status(500).json({success:false,message:error.message || error})
    }
}

const applyCouponController=async (req,res)=>{
try {
  
} catch (error) {
  return res
    .status(500)
    .json({ success: false, message: error.message || error });
}
}



module.exports = { createCouponController, applyCouponController };