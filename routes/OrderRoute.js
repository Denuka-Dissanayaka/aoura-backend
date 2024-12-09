const express = require("express");
const {
  getOrders,
  getOrderById,
  getOrdersBasedOnNetwork,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrdersCount,
  getOrdersStatusCount,
} = require("../controllers/OrderController.js");
const { verifyUser, adminOnly } = require("../middleware/AuthUser");
const verifyJWT = require("../middleware/verifyJWT.js");

const router = express.Router();

router.get("/orders", verifyJWT, verifyUser, getOrders);
router.get("/orders/count", verifyJWT, verifyUser, getOrdersCount);
router.get("/orders/status-count", verifyJWT, verifyUser, getOrdersStatusCount);
router.get("/orders/:id", verifyJWT, verifyUser, getOrderById);
router.get(
  "/orders/base-on-network/:networkId",
  verifyJWT,
  verifyUser,
  getOrdersBasedOnNetwork
);
router.post("/orders", verifyJWT, verifyUser, createOrder);
router.patch("/orders/:id", verifyJWT, verifyUser, updateOrder);
router.delete("/orders/:id", verifyJWT, verifyUser, deleteOrder);

module.exports = router;
