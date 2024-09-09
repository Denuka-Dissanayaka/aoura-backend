const Products = require("../models/ProductModel");
const Users = require("../models/UsersModel");
const Networks = require("../models/NetworkModule");
const Customers = require("../models/CustomersModule");
const Orders = require("../models/OrderModule");
const { Op } = require("sequelize");

const getOrders = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Orders.findAll({
        attributes: ["uuid", "status", "date", "quantity", "price"],
        include: [
          {
            model: Products,
            attributes: ["uuid", "name"],
          },
          {
            model: Networks,
            attributes: ["uuid", "name"],
          },
          {
            model: Customers,
            attributes: ["uuid", "name", "email", "address", "phone"],
          },
        ],
      });
    } else {
      response = await Orders.findAll({
        attributes: ["uuid", "status", "date", "quantity", "price"],
        where: {
          networkId: req.networkId,
        },
        include: [
          {
            model: Products,
            attributes: ["uuid", "name"],
          },
          {
            model: Networks,
            attributes: ["uuid", "name"],
          },
          {
            model: Customers,
            attributes: ["uuid", "name", "email", "address", "phone"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Orders.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!order) return res.status(404).json({ msg: "Data Not Found" });
    let response;
    if (req.role === "admin") {
      response = await Orders.findOne({
        attributes: ["uuid", "status", "date", "quantity", "price"],
        where: {
          id: order.id,
        },
        include: [
          {
            model: Products,
            attributes: ["uuid", "name"],
          },
          {
            model: Networks,
            attributes: ["uuid", "name"],
          },
          {
            model: Customers,
            attributes: ["uuid", "name", "email", "address", "phone"],
          },
        ],
      });
    } else {
      response = await Orders.findOne({
        attributes: ["uuid", "status", "date", "quantity", "price"],
        where: {
          [Op.and]: [{ id: order.id }, { networkId: req.networkId }],
        },
        include: [
          {
            model: Products,
            attributes: ["uuid", "name"],
          },
          {
            model: Networks,
            attributes: ["uuid", "name"],
          },
          {
            model: Customers,
            attributes: ["uuid", "name", "email", "address", "phone"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const createOrder = async (req, res) => {
  const { price, quantity, date, productId, customerId, networkId } = req.body;

  try {
    if (req.role === "admin") {
      await Orders.create({
        price: price,
        quantity: quantity,
        date: date,
        productId: productId,
        customerId: customerId,
        networkId: networkId,
      });
      res.status(201).json({ msg: "Order Created Successfuly" });
    } else {
      await Orders.create({
        price: price,
        quantity: quantity,
        date: date,
        productId: productId,
        customerId: customerId,
        networkId: req.networkId,
      });
      res.status(201).json({ msg: "Order Created Successfuly" });
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

const deleteOrder = async (req, res) => {
  try {
    const order = await Orders.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!order) return res.status(404).json({ msg: "Data Not Found" });

    if (req.role === "admin") {
      await Orders.destroy({
        where: {
          id: order.id,
        },
      });
    } else {
      if (req.networkId !== order.networkId)
        return res.status(403).json({ msg: "Access Forbidden" });
      await Orders.destroy({
        where: {
          [Op.and]: [{ id: order.id }, { networkId: req.networkId }],
        },
      });
    }
    res.status(200).json({ msg: "Order deleted successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  deleteOrder,
};
