const Products = require("../models/ProductModel");
const Users = require("../models/UsersModel");
const Networks = require("../models/NetworkModule");
const Customers = require("../models/CustomersModule");
const Orders = require("../models/OrderModule");
const { Op } = require("sequelize");

const getOrders = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 8;

  const offset = limit * page;
  try {
    let response;
    let totalRows;
    let totalPage;
    if (req.role === "admin") {
      totalRows = await Orders.count();
      totalPage = Math.ceil(totalRows / limit);

      response = await Orders.findAll({
        attributes: ["id", "uuid", "status", "date", "quantity", "price"],
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
        offset: offset,
        limit: limit,
        order: [["id", "DESC"]],
      });
    } else {
      response = await Orders.findAll({
        attributes: ["id", "uuid", "status", "date", "quantity", "price"],
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
    res.status(200).json({
      response,
      page: page,
      limit: limit,
      totalRows: totalRows,
      totalPage: totalPage,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getOrdersCount = async (req, res) => {
  let response;
  if (req.role === "admin") {
    response = await Orders.count();
  } else {
    response = await Orders.count({
      where: { networkId: req.networkId },
    });
  }
  res.status(200).json({
    response,
  });
};

const getOrdersStatusCount = async (req, res) => {
  const status = req.query.status || "";
  //const networkId = req.query.networkId || "";
  let response;
  if (req.role === "admin") {
    response = await Orders.count({
      where: {
        status: status,
      },
    });
  } else {
    response = await Orders.count({
      where: {
        [Op.and]: [
          {
            status: status,
          },
          {
            networkId: req.networkId,
          },
        ],
      },
    });
  }
  res.status(200).json({
    count: response,
  });
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
        attributes: [
          "uuid",
          "status",
          "date",
          "quantity",
          "price",
          "createdAt",
        ],
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
        attributes: [
          "uuid",
          "status",
          "date",
          "quantity",
          "price",
          "createdAt",
        ],
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

const getOrdersBasedOnNetwork = async (req, res) => {
  try {
    const response = await Orders.findAll({
      attributes: ["uuid", "status", "date", "quantity", "price"],
      where: {
        networkId: req.params.networkId,
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

const updateOrder = async (req, res) => {
  try {
    const order = await Orders.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!order) return res.status(404).json({ msg: "Data Not Found" });
    const { price, quantity, status } = req.body;
    if (req.role === "admin") {
      await Orders.update(
        { price, quantity, status },
        {
          where: {
            id: order.id,
          },
        }
      );
    } else {
      if (req.networkId !== order.networkId)
        return res.status(403).json({ msg: "Access Forbidden" });
      await Orders.update(
        { price, quantity, status },
        {
          where: {
            [Op.and]: [{ id: order.id }, { networkId: req.networkId }],
          },
        }
      );
    }
    res.status(200).json({ msg: "Order updated successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

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
  getOrdersBasedOnNetwork,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrdersCount,
  getOrdersStatusCount,
};
