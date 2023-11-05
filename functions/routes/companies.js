const express = require("express");

const CompanyPostController = require("../controllers/companies");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();


router.post("", checkAuth, CompanyPostController.createCompany);

router.put("/:id", checkAuth, CompanyPostController.updateCompany);

router.get("/all", CompanyPostController.getAllCompanies);

router.get("/filtrer", CompanyPostController.filtrerCompanies);

router.get("", CompanyPostController.getCompanies);

router.get("/:id", CompanyPostController.getCompany);

router.delete("/:id", checkAuth, CompanyPostController.deleteCompany);

module.exports = router;
