const express = require("express");

const CompanyPostController = require("../controllers/companies");


const router = express.Router();

router.post("", extractFile, CompanyPostController.createCompany);

router.put("/:id", extractFile, CompanyPostController.updateCompany);

router.get("", CompanyPostController.getCompanies);

router.get("/:id", CompanyPostController.getCompany);

router.delete("/:id", CompanyPostController.deleteCompany);

module.exports = router;
