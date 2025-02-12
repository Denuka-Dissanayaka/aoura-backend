const express = require("express");
const {
  getSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} = require("../controllers/SupplierController.js");
const { verifyUser, adminOnly } = require("../middleware/AuthUser");
const verifyJWT = require("../middleware/verifyJWT.js");

const router = express.Router();

router.get("/suppliers", verifyJWT, verifyUser, adminOnly, getSuppliers);

router.get("/suppliers/:id", verifyJWT, verifyUser, adminOnly, getSupplierById);

router.post("/suppliers", verifyJWT, verifyUser, adminOnly, createSupplier);
router.patch(
  "/suppliers/:id",
  verifyJWT,
  verifyUser,
  adminOnly,
  updateSupplier
);
router.delete(
  "/suppliers/:id",
  verifyJWT,
  verifyUser,
  adminOnly,
  deleteSupplier
);

module.exports = router;
