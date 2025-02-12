const express = require("express");
const {
  getIngredients,
  getIngredientById,
  createIngredient,
  updateIngredient,
  deleteIngredient,
} = require("../controllers/IngredientController.js");
const { verifyUser, adminOnly } = require("../middleware/AuthUser");
const verifyJWT = require("../middleware/verifyJWT.js");

const router = express.Router();

router.get("/ingredients", verifyJWT, verifyUser, adminOnly, getIngredients);

router.get(
  "/ingredients/:id",
  verifyJWT,
  verifyUser,
  adminOnly,
  getIngredientById
);

router.post("/ingredients", verifyJWT, verifyUser, adminOnly, createIngredient);
router.patch(
  "/ingredients/:id",
  verifyJWT,
  verifyUser,
  adminOnly,
  updateIngredient
);
router.delete(
  "/ingredients/:id",
  verifyJWT,
  verifyUser,
  adminOnly,
  deleteIngredient
);

module.exports = router;
