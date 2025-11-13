const express=require('express')
const { couponController } = require('../../../controller/couponController')

const router=express.Router()

router.post("/create",couponController)



module.exports=router