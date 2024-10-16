const express = require("express");
const {
  getUsers,
  getUserById,
  getUsersBasedOnNetwork,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/UserController");
const { verifyUser, adminOnly } = require("../middleware/AuthUser");
const verifyJWT = require("../middleware/verifyJWT.js");

const router = express.Router();

router.get("/users", verifyJWT, verifyUser, getUsers);
router.get("/users/:id", verifyJWT, verifyUser, getUserById);
router.get(
  "/users/base-on-network/:networkId",
  verifyJWT,
  verifyUser,
  adminOnly,
  getUsersBasedOnNetwork
);
router.post("/users", verifyJWT, verifyUser, adminOnly, createUser);
router.patch("/users/:id", verifyJWT, verifyUser, adminOnly, updateUser);
router.delete("/users/:id", verifyJWT, verifyUser, adminOnly, deleteUser);

module.exports = router;
