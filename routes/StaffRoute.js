const express = require("express");
const {
  getStaffs,
  createStaff,
  deleteStaff,
} = require("../controllers/StaffController");
const { verifyUser, adminOnly } = require("../middleware/AuthUser");

const router = express.Router();

router.get("/staffs", verifyUser, adminOnly, getStaffs);
//router.get("/users/:id", verifyUser, getUserById);
router.post("/staffs", verifyUser, adminOnly, createStaff);
//router.patch("/users/:id", verifyUser, adminOnly, updateUser);
router.delete("/staffs/:id", verifyUser, adminOnly, deleteStaff);

module.exports = router;
