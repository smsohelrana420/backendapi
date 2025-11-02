const express = require("express");
const { addBannerController, deleteBannerController, updateBannerController, allBannersController } = require("../../../controller/bannerController");

const router = express.Router();

const { TokenCheckMiddleware, adminCheck } = require("../../../utils/authMiddleware");
const upload = require("../../../utils/upload");


//"/addbanner", TokenCheckMiddleware,adminCheck,upload.single
router.post("/addbanner",upload.single("banner"), addBannerController);
//upload.single("banner"),
router.delete("/deletebanner/:id", deleteBannerController);
// router.delete("/deletebanner/:id",TokenCheckMiddleware,adminCheck, deleteBannerController);
router.patch("/updatebanner/:id",upload.single("banner"),updateBannerController)

router.get("/allbanners",allBannersController)

module.exports = router;
