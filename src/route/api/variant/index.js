const express=require('express')
const { createVariantController } = require('../../../controller/createVariantController')

const router=express.Router()

router.post("/addvariant",createVariantController)




module.exports=router