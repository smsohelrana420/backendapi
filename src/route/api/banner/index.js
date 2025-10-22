const express = require("express");
const { addBannerController, deleteBannerController } = require("../../../controller/bannerController");
const multer = require("multer");
const router = express.Router();
const path=require('path');
const { TokenCheckMiddleware, adminCheck } = require("../../../utils/authMiddleware");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const randomtext = Date.now() + "-" + Math.round(Math.random() * 1e9);
    let fileextenstion=file.originalname.split('.')
    let extanstion = fileextenstion[fileextenstion.length - 1];
    
    cb(null, file.fieldname + "-" + randomtext+"."+extanstion);
  },
});

function checkFileType(file,cb){
    const filetypes=/jpeg|jpg|png|gif|wmv/;
    const extname=filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype=filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null,true)
    }else{
        cb('Error: Images only! (jpeg,jpg,png,gif,wmv)')
    }}

const upload = multer({ storage: storage,fileFilter:function(req,file,cb){
    checkFileType(file,cb)
// limits:{filesize:2000000}
}});
router.post("/addbanner",TokenCheckMiddleware,adminCheck,upload.single("banner"), addBannerController);
//upload.single("banner"),
router.delete("/deletebanner/:id",TokenCheckMiddleware,adminCheck, deleteBannerController);

module.exports = router;
