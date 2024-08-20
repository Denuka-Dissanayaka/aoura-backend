const express = require("express");
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/UserController");
const { verifyUser, adminOnly } = require("../middleware/AuthUser");

const router = express.Router();

router.get("/users", verifyUser, getUsers);
router.get("/users/:id", verifyUser, getUserById);
router.post("/users", verifyUser, adminOnly, createUser);
router.patch("/users/:id", verifyUser, adminOnly, updateUser);
router.delete("/users/:id", verifyUser, adminOnly, deleteUser);

module.exports = router;
