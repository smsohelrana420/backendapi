const couponModel = require("../model/coupon.model");

const couponController=async(req,res)=>{
 

    try {
        
                let code=req.body
        
                let couponcode = new couponModel({
                  code
                });
        
                await couponcode.save()

                return res.status(201).json({success:true,message:"coupon created successfull",data:couponcode})
    } catch (error) {
        return res.status(500).json({success:false,message:error.message || error})
    }
}


module.exports = { couponController };