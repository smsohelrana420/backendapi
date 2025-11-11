const express = require("express");
const { addSubCategoryController, deleteSubcategoryController, updateSubcategoryController } = require("../../../controller/subCategoryController");


const router = express.Router();

router.post("/addsubcategory",addSubCategoryController)
router.delete("/deletesubcategory/:id",deleteSubcategoryController)

router.patch("/updatesubcategory/:id",updateSubcategoryController)

module.exports = router;
