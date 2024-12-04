const express = require("express");
const {
  getProducts,
  getProductsCount,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsBasedOnNetwork,
  getProductsBasedOnNetwork2,
  getProductByIdForPrice,
} = require("../controllers/ProductController.js");
const { verifyUser, adminOnly } = require("../middleware/AuthUser");
const verifyJWT = require("../middleware/verifyJWT.js");

const router = express.Router();

router.get("/products", verifyJWT, verifyUser, getProducts);
router.get("/products/count", verifyJWT, verifyUser, getProductsCount);
router.get("/products/:id", verifyJWT, verifyUser, getProductById);
router.get(
  "/products/base-on-network/:networkId",
  verifyJWT,
  verifyUser,
  getProductsBasedOnNetwork
);
router.get(
  "/products/base-on-network2/:networkId",
  verifyJWT,
  verifyUser,
  adminOnly,
  getProductsBasedOnNetwork2
);
router.get(
  "/products/get-price/:productId",
  verifyJWT,
  verifyUser,
  getProductByIdForPrice
);
router.post("/products", verifyJWT, verifyUser, createProduct);
router.patch("/products/:id", verifyJWT, verifyUser, updateProduct);
router.delete("/products/:id", verifyJWT, verifyUser, deleteProduct);

module.exports = router;
