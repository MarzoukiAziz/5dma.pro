const express = require("express");

const AppController = require("../controllers/apps");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();


router.post("", checkAuth, AppController.createApp);

router.put("/:id", checkAuth, AppController.updateApp);


router.get("/filtrer", AppController.filtrerApps);
router.get("/count", AppController.countApps);
router.get("/ids", AppController.getAppsIds)


router.get("/:id", AppController.getApp);

router.delete("/:id", checkAuth, AppController.deleteApp);

module.exports = router;