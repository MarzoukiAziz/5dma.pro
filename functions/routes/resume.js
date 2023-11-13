const express = require("express");
const educationController = require("../controllers/educations");
const experienceController = require("../controllers/experiences");
const skillController = require("../controllers/skills");
const languageController = require("../controllers/languages");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("/edu/:userId", checkAuth, educationController.addEducation);
router.put("/edu/:userId/:educationId", checkAuth, educationController.updateEducation);
router.delete("/edu/:userId/:educationId", checkAuth, educationController.deleteEducation);

router.post("/skill/:userId", checkAuth, skillController.addSkill);
router.delete("/skill/:userId/:skillId", checkAuth, skillController.deleteSkill);


router.post("/exp/:userId", checkAuth, experienceController.addExperience);
router.put("/exp/:userId/:experienceId", checkAuth, experienceController.updateExperience);
router.delete("/exp/:userId/:experienceId", checkAuth, experienceController.deleteExperience);

router.post("/lang/:userId", checkAuth, languageController.addLanguage);
router.delete("/lang/:userId/:languageId", checkAuth, languageController.deleteLanguage);



module.exports = router;
