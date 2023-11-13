const express = require("express");
const educationController = require("../controllers/educations");
const experienceController = require("../controllers/experiences");
const skillController = require("../controllers/skills");
const languageController = require("../controllers/languages");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("/edu", checkAuth, educationController.addEducation);
router.put("/edu/:id", checkAuth, educationController.updateEducation);
router.delete("/edu/:id", checkAuth, educationController.deleteEducation);

router.post("/skill", checkAuth, skillController.addSkill);
router.put("/skill/:id", checkAuth, skillController.updateSkill);
router.delete("/skill/:id", checkAuth, skillController.deleteSkill);


router.post("/exp", checkAuth, experienceController.addExperience);
router.put("/exp/:id", checkAuth, experienceController.updateExperience);
router.delete("/exp/:id", checkAuth, experienceController.deleteExperience);

router.post("/lang", checkAuth, languageController.addLanguage);
router.put("/lang/:id", checkAuth, languageController.updateLanguage);
router.delete("/lang/:id", checkAuth, languageController.deleteLanguage);



module.exports = router;
