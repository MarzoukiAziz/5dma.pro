const express = require("express");

const UserController = require("../controllers/users");

const router = express.Router();
const checkAuth = require("../middleware/check-auth");

router.post("/sign-up", UserController.createUser);

router.post("/login", UserController.userLogin);

router.put("/update-password/:id", checkAuth, UserController.updatePassword);

router.put("/update", checkAuth, UserController.updateUser);

router.get("/all", checkAuth, UserController.getUsers);

router.get("/:id", checkAuth, UserController.getUser);


module.exports = router;
