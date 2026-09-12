const express = require("express");

const { register } = require("../controllers/authContoller");

const validateAuth = require("../middleware/validateAuth");

const validateLogin = require("../middleware/validateLogin");

const router = express.Router();

router.post("/auth/register",validateAuth, register);

router.post("auth/login", validateLogin, login);

module.exports = router;


//flow
// request -> validateAuth() -> next() -> register

// if fail 
// request -> validateAuth() -> 400 response -> stop
