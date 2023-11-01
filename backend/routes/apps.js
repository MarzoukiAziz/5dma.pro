const express = require("express");

const AppController = require("../controllers/apps");


const router = express.Router();


router.post("", AppController.createApp);

router.put("/:id", AppController.updateApp);


router.get("/filtrer", AppController.filtrerApps);


router.get("/:id", AppController.getApp);

router.delete("/:id", AppController.deleteApp);

module.exports = router;