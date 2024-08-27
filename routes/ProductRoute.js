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
router.get("/products/:id", verifyJWT, verifyUser, getProductById);
router.post("/products", verifyJWT, verifyUser, createProduct);
router.patch("/products/:id", verifyJWT, verifyUser, updateProduct);
router.delete("/products/:id", verifyJWT, verifyUser, deleteProduct);

module.exports = router;
