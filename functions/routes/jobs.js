const express = require("express");
const JobController = require("../controllers/jobs");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("/scrapper", JobController.createJobFromScrapper);

router.post("", JobController.createJob);
router.put("/:id", checkAuth, JobController.updateJob);
router.get("/all", checkAuth, JobController.getAllJobs);
router.get("/filtrer", JobController.filtrerJobs);
router.get("", JobController.getJobs);
router.get("/:id", JobController.getJob);
router.delete("/:id", checkAuth, JobController.deleteJob);

module.exports = router;
