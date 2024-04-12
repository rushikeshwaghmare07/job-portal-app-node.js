const express = require("express");
const { registerUserController } = require("../controllers/authenticate.controller");

const router = express.Router();

router.post("/register", registerUserController);

module.exports = router;