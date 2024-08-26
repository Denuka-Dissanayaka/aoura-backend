const express = require("express");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/ProductController.js");
const { verifyUser, adminOnly } = require("../middleware/AuthUser");
const verifyJWT = require("../middleware/verifyJWT.js");

const router = express.Router();

router.get("/products", verifyJWT, verifyUser, getProducts);
router.get("/products/:id", verifyUser, getProductById);
router.post("/products", verifyUser, createProduct);
router.patch("/products/:id", verifyUser, updateProduct);
router.delete("/products/:id", verifyUser, deleteProduct);

module.exports = router;
