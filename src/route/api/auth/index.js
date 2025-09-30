const express = require("express");
const router = express.Router();

router.get('/signup',(req,res)=>{
    return res.send("signup")
})
module.exports = router;
