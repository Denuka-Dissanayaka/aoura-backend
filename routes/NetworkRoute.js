const express = require("express");
const {
  getNetworks,
  getNetworks2,
  getNetworkById,
  createNetworks,
  updateNetwork,
  deleteNetwork,
} = require("../controllers/NetworkController");
const { verifyUser, adminOnly } = require("../middleware/AuthUser");
const verifyJWT = require("../middleware/verifyJWT.js");

const router = express.Router();

router.get("/networks", verifyJWT, verifyUser, getNetworks);
router.get("/networks2", verifyJWT, verifyUser, adminOnly, getNetworks2);
router.get("/networks/:id", verifyJWT, verifyUser, adminOnly, getNetworkById);
router.post("/networks", verifyJWT, verifyUser, adminOnly, createNetworks);
router.patch("/networks/:id", verifyJWT, verifyUser, adminOnly, updateNetwork);
router.delete("/networks/:id", verifyJWT, verifyUser, adminOnly, deleteNetwork);

module.exports = router;
