const express = require("express");
const {
  getStaffs,
  getStaffsCount,
  getStaffById,
  getStaffsBasedOnNetwork,
  createStaff,
  updateStaff,
  deleteStaff,
} = require("../controllers/StaffController");
const { verifyUser, adminOnly } = require("../middleware/AuthUser");
const verifyJWT = require("../middleware/verifyJWT.js");

const router = express.Router();

router.get("/staffs", verifyJWT, verifyUser, adminOnly, getStaffs);
router.get("/staffs/count", verifyJWT, verifyUser, adminOnly, getStaffsCount);
router.get("/staffs/:id", verifyJWT, verifyUser, adminOnly, getStaffById);
router.get(
  "/staffs/base-on-network/:networkId",
  verifyJWT,
  verifyUser,
  adminOnly,
  getStaffsBasedOnNetwork
);
router.post("/staffs", verifyJWT, verifyUser, adminOnly, createStaff);
router.patch("/staffs/:id", verifyJWT, verifyUser, adminOnly, updateStaff);
router.delete("/staffs/:id", verifyJWT, verifyUser, adminOnly, deleteStaff);

module.exports = router;
