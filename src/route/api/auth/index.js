const express = require("express");
const {singupController} = require("../../../controller/authController");


const router = express.Router();

router.post('/signup',singupController)
module.exports = router;
