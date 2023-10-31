const express = require("express");

const UserController = require("../controllers/users");

const router = express.Router();

router.post("/sign-up", UserController.createUser);

router.post("/login", UserController.userLogin);

router.put("/update-password/:id", UserController.updatePassword);

router.put("/update", UserController.updateUser);

router.get("/all", UserController.getUsers);

router.get("/:id", UserController.getUser);


module.exports = router;
