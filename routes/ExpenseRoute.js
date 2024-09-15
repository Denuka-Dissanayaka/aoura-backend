const express = require("express");
const {
  getExpenses,
  getExpenseById,
  createExpense,
  deleteExpense,
} = require("../controllers/ExpensesController.js");
const { verifyUser, adminOnly } = require("../middleware/AuthUser");
const verifyJWT = require("../middleware/verifyJWT.js");

const router = express.Router();

router.get("/expenses", verifyJWT, verifyUser, getExpenses);
router.get("/expenses/:id", verifyJWT, verifyUser, getExpenseById);
router.post("/expenses", verifyJWT, verifyUser, createExpense);
// router.patch("/products/:id", verifyJWT, verifyUser, updateProduct);
router.delete("/expenses/:id", verifyJWT, verifyUser, deleteExpense);

module.exports = router;
