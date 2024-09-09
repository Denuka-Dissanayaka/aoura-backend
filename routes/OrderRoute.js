const express = require("express");
const {
  getOrders,
  getOrderById,
  createOrder,
  deleteOrder,
} = require("../controllers/OrderController.js");
const { verifyUser, adminOnly } = require("../middleware/AuthUser");
const verifyJWT = require("../middleware/verifyJWT.js");

const router = express.Router();

router.get("/orders", verifyJWT, verifyUser, getOrders);
router.get("/orders/:id", verifyJWT, verifyUser, getOrderById);
router.post("/orders", verifyJWT, verifyUser, createOrder);
// router.patch("/products/:id", verifyJWT, verifyUser, updateProduct);
router.delete("/orders/:id", verifyJWT, verifyUser, deleteOrder);

module.exports = router;
