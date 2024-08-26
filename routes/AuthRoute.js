const express = require("express");

const { Login, logOut, Me } = require("../controllers/Auth");
const verifyJWT = require("../middleware/verifyJWT");

const router = express.Router();

router.get("/me", verifyJWT, Me);
router.post("/login", Login);
router.delete("/logout", logOut);

module.exports = router;
