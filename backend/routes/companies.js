const express = require("express");

const CompanyPostController = require("../controllers/companies");
const extractFile = require("../middleware/file");


const router = express.Router();


router.post("", extractFile, CompanyPostController.createCompany);

router.put("/:id", extractFile, CompanyPostController.updateCompany);

router.get("/all", extractFile, CompanyPostController.getAllCompanies);

router.get("", CompanyPostController.getCompanies);

router.get("/:id", CompanyPostController.getCompany);

router.delete("/:id", CompanyPostController.deleteCompany);

module.exports = router;
