const express = require("express");
const {
  getCustomers,
  getCustomersCount,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomersBasedOnNetwork,
} = require("../controllers/CustomerController.js");
const { verifyUser, adminOnly } = require("../middleware/AuthUser");
const verifyJWT = require("../middleware/verifyJWT.js");

const router = express.Router();

router.get("/customers", verifyJWT, verifyUser, getCustomers);
router.get("/customers/count", verifyJWT, verifyUser, getCustomersCount);
router.get("/customers/:id", verifyJWT, verifyUser, getCustomerById);
router.get(
  "/customers/base-on-network/:networkId",
  verifyJWT,
  verifyUser,
  getCustomersBasedOnNetwork
);
router.post("/customers", verifyJWT, verifyUser, createCustomer);
router.patch("/customers/:id", verifyJWT, verifyUser, updateCustomer);
router.delete("/customers/:id", verifyJWT, verifyUser, deleteCustomer);

module.exports = router;
