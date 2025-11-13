const express=require('express')
const { createProductController, allProductController, latestProductController, deleteProductController } = require('../../../controller/productController');
const upload = require('../../../utils/upload');
const router=express.Router()


router.post("/create",upload.array("product"), createProductController);

router.get("/allproduct",allProductController)
router.get("/latestproduct",latestProductController)
router.delete("/deleteproduct/:id",deleteProductController)


module.exports=router