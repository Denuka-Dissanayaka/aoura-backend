const express = require("express");
const {
  getStaffs,
  createStaff,
  deleteStaff,
} = require("../controllers/StaffController");
const { verifyUser, adminOnly } = require("../middleware/AuthUser");
const verifyJWT = require("../middleware/verifyJWT.js");

const router = express.Router();

router.get("/staffs", verifyJWT, verifyUser, adminOnly, getStaffs);
//router.get("/users/:id", verifyUser, getUserById);
router.post("/staffs", verifyJWT, verifyUser, adminOnly, createStaff);
//router.patch("/users/:id", verifyUser, adminOnly, updateUser);
router.delete("/staffs/:id", verifyJWT, verifyUser, adminOnly, deleteStaff);

module.exports = router;
