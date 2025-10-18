const express = require("express");
const {singupController, verifyOtpController, loginController, alluserController} = require("../../../controller/authController");
const {  TokenCheckMiddleware, adminCheck } = require("../../../utils/authMiddleware");


const router = express.Router();

router.post('/signup',singupController);
router.post('/verify-otp',verifyOtpController);
router.post('/login',loginController)
router.get("/allusers",TokenCheckMiddleware,adminCheck, alluserController)
module.exports = router;
