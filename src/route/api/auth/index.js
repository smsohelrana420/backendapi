const express = require("express");
const {singupController, verifyOtpController} = require("../../../controller/authController");


const router = express.Router();

router.post('/signup',singupController)
router.post('/verify-otp',verifyOtpController)
module.exports = router;
