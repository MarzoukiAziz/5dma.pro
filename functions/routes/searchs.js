const express = require("express");

const SearchController = require("../controllers/searchs");
const checkAuth = require("../middleware/check-auth");


const router = express.Router();


router.post("", checkAuth, SearchController.createSearch);
router.get("/", SearchController.filtrerSearchs);
router.delete("/:id", checkAuth, SearchController.deleteSearch);

module.exports = router;