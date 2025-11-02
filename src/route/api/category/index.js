const express = require("express");
const { addCategoryController } = require("../../../controller/addCategoryController");

const router = express.Router();

// add category

router.post("/addcategory",addCategoryController)

module.exports = router;
