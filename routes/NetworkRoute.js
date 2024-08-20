const express = require("express");
const {
  getNetworks,
  getNetworkById,
  createNetworks,
  updateNetwork,
  deleteNetwork,
} = require("../controllers/NetworkController");
const { verifyUser, adminOnly } = require("../middleware/AuthUser");

const router = express.Router();

router.get("/networks", verifyUser, adminOnly, getNetworks);
router.get("/networks/:id", verifyUser, adminOnly, getNetworkById);
router.post("/networks", verifyUser, adminOnly, createNetworks);
router.patch("/networks/:id", verifyUser, adminOnly, updateNetwork);
router.delete("/networks/:id", verifyUser, adminOnly, deleteNetwork);

module.exports = router;
