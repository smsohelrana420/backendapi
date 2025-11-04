const express = require("express");
const { addSubCategoryController } = require("../../../controller/subCategoryController");

const router = express.Router();

router.post("/addsubcategory",addSubCategoryController)

module.exports = router;
