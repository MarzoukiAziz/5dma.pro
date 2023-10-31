const express = require("express");

const UserController = require("../controllers/users");

const router = express.Router();

router.post("/sign-up", UserController.createUser);

router.post("/login", UserController.userLogin);

router.put("/user/:id/update-password", UserController.updatePassword);

router.put("/user/:id/update", UserController.updateUser);

router.get("/all-users", UserController.getUsers);

router.get("/:id", UserController.getUser);


module.exports = router;
