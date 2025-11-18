const cartModel = require("../model/cart.model");
const productModel = require("../model/product.model");

const addtocartController= async(req,res)=>{

    try {
        let {user,product,quantity,variant} =req.body;
         
        let productinfo=await productModel.findById(product)

        let totalPrice=productinfo.discountprice * quantity;

        if(productinfo.variantType =="multiVariant"){

            if(!variant){
                return res.status(404).json({success:false,message:"variant is required"})
            }
            else{
 let addtocart = new cartModel({
   user,
   product,
   quantity,
   totalPrice,
   variant,
 });
 await addtocart.save();

 return res.status(201).json({
   success: true,
   message: "product added to cart",
   data: addtocart,
 });
            }
    
        }else{
  let addtocart = new cartModel({
    user,
    product,
    quantity,
    totalPrice,
    variant,
  });
  await addtocart.save();

  return res
    .status(201)
    .json({ success: true, message: "product added to cart", data: addtocart });
        }


      
    } catch (error) {
        return res.status(500).json({success:false,message:error.message || error})
    }
}

const getAllCartListController=async(req,res)=>{
 try {
    let allcartlist = await cartModel
      .find({})
      .populate({
        path: "user",
        select: "name email",
      })
      .populate({
        path:"product",
        select:"title image price discountprice variant"
      }).populate({
        path:"variant",
        select:"size stock"
      })
      

    return res.status(200).json({success:true,message:"cart fetch successfull",data:allcartlist})
 } catch (error) {
    return res.status(500).json({message:error.message || error})
 }
}

const singleusercartController=async(req,res)=>{


  try {
    let {id}=req.params;

    let cartlist = await cartModel
      .find({ user: id })
      .select("-user")
      .populate({
        path: "product",
        select: "title image price discountprice variant",
      })
      .populate({
        path: "variant",
        select: "size stock",
      });
      

    return res.status(200).json({success:true,message:"single user cart",data:cartlist})
  } catch (error) {
    
    return res.status(500).json({success:false,message:error.message || error})
  }
}

module.exports = {
  addtocartController,
  getAllCartListController,
  singleusercartController,
};