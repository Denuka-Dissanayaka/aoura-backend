const express = require("express");
const {
  getExpenses,
  getExpenseById,
  getExpensesBasedOnNetwork,
  createExpense,
  updateExpense,
  deleteExpense,
} = require("../controllers/ExpensesController.js");
const { verifyUser, adminOnly } = require("../middleware/AuthUser");
const verifyJWT = require("../middleware/verifyJWT.js");

const router = express.Router();

router.get("/expenses", verifyJWT, verifyUser, getExpenses);
router.get("/expenses/:id", verifyJWT, verifyUser, getExpenseById);
router.get(
  "/expenses/base-on-network/:networkId",
  verifyJWT,
  verifyUser,
  getExpensesBasedOnNetwork
);
router.post("/expenses", verifyJWT, verifyUser, createExpense);
router.patch("/expenses/:id", verifyJWT, verifyUser, updateExpense);
router.delete("/expenses/:id", verifyJWT, verifyUser, deleteExpense);

module.exports = router;
