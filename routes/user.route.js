const express = require("express");
const userAuth = require("../middlewares/auth.middleware");
const { updateUserController } = require("../controllers/user.controller");

const router = express.Router();

router.put("/update-user", userAuth, updateUserController);

module.exports = router;