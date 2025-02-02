const express = require("express");
const { getCashbookRecords } = require("../controllers/CashbookController.js");
const { verifyUser, adminOnly } = require("../middleware/AuthUser");
const verifyJWT = require("../middleware/verifyJWT.js");

const router = express.Router();

router.get("/cashbook", verifyJWT, verifyUser, getCashbookRecords);

module.exports = router;
