const express = require("express");
const JobController = require("../controllers/jobs");
const extractFile = require("../middleware/file");

const router = express.Router();

router.post("", extractFile, JobController.createJob);
router.put("/:id", extractFile, JobController.updateJob);
router.get("", JobController.getJobs);
router.get("/:id", JobController.getJob);
router.delete("/:id", JobController.deleteJob);

module.exports = router;
