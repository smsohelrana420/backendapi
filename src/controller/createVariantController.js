const productModel = require("../model/product.model");
const variantModel = require("../model/variant.model")


const createVariantController=async(req,res)=>{


    try {

        let {size,stock,product}=req.body

        let variant = new variantModel({
          size,
          stock,
          product,
        });

        await variant.save()

         await productModel.findOneAndUpdate(
            { _id: product },
            { $push: { variants: variant._id } }
        );

        return res.status(201).json({success:true,message:"variant created successfull",data:variant})
        
    } catch (error) {
        return res.status(500).json({success:false,message:error.message || error})
    }

}


module.exports={createVariantController}