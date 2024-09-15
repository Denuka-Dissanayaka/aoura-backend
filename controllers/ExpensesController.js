const Products = require("../models/ProductModel");
const Expenses = require("../models/ExpensesModule");
const Users = require("../models/UsersModel");
const Networks = require("../models/NetworkModule");
const Customers = require("../models/CustomersModule");
const Orders = require("../models/OrderModule");
const { Op } = require("sequelize");

const getExpenses = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Expenses.findAll({
        attributes: ["uuid", "type", "date", "value"],
        include: [
          {
            model: Networks,
            attributes: ["uuid", "name"],
          },
        ],
      });
    } else {
      response = await Expenses.findAll({
        attributes: ["uuid", "type", "date", "value"],
        where: {
          networkId: req.networkId,
        },
        include: [
          {
            model: Networks,
            attributes: ["uuid", "name"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getExpenseById = async (req, res) => {
  try {
    const expense = await Expenses.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!expense) return res.status(404).json({ msg: "Data Not Found" });
    let response;
    if (req.role === "admin") {
      response = await Expenses.findOne({
        attributes: ["uuid", "type", "date", "value"],
        where: {
          id: expense.id,
        },
        include: [
          {
            model: Networks,
            attributes: ["uuid", "name"],
          },
        ],
      });
    } else {
      response = await Expenses.findOne({
        attributes: ["uuid", "type", "date", "value"],
        where: {
          [Op.and]: [{ id: expense.id }, { networkId: req.networkId }],
        },
        include: [
          {
            model: Networks,
            attributes: ["uuid", "name"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const createExpense = async (req, res) => {
  const { type, value, date, networkId } = req.body;

  try {
    if (req.role === "admin") {
      await Expenses.create({
        type: type,
        value: value,
        date: date,

        networkId: networkId,
      });
      res.status(201).json({ msg: "Expense Added Successfuly" });
    } else {
      await Expenses.create({
        type: type,
        value: value,
        date: date,

        networkId: req.networkId,
      });
      res.status(201).json({ msg: "Expense Added Successfuly" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// const updateProduct = async (req, res) => {
//   try {
//     const product = await Products.findOne({
//       where: {
//         uuid: req.params.id,
//       },
//     });
//     if (!product) return res.status(404).json({ msg: "Data Not Found" });
//     const { name, price, quantity } = req.body;
//     if (req.role === "admin") {
//       await Products.update(
//         { name, price, quantity },
//         {
//           where: {
//             id: product.id,
//           },
//         }
//       );
//     } else {
//       if (req.userId !== product.userId)
//         return res.status(403).json({ msg: "Access Forbidden" });
//       await Products.update(
//         { name, price, quantity },
//         {
//           where: {
//             [Op.and]: [{ id: product.id }, { userId: req.userId }],
//           },
//         }
//       );
//     }
//     res.status(200).json({ msg: "Product updated successfuly" });
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };

const deleteExpense = async (req, res) => {
  try {
    const expense = await Expenses.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!expense) return res.status(404).json({ msg: "Data Not Found" });

    if (req.role === "admin") {
      await Expenses.destroy({
        where: {
          id: expense.id,
        },
      });
    } else {
      if (req.networkId !== expense.networkId)
        return res.status(403).json({ msg: "Access Forbidden" });
      await Expenses.destroy({
        where: {
          [Op.and]: [{ id: expense.id }, { networkId: req.networkId }],
        },
      });
    }
    res.status(200).json({ msg: "Expense deleted successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  getExpenses,
  getExpenseById,
  createExpense,
  deleteExpense,
};