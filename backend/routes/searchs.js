const express = require("express");

const SearchController = require("../controllers/searchs");


const router = express.Router();


router.post("", SearchController.createSearch);
router.get("/", SearchController.filtrerSearchs);
router.delete("/:id", SearchController.deleteSearch);

module.exports = router;