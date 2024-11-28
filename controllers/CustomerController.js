//const Products = require("../models/ProductModel");
const Customers = require("../models/CustomersModule");
//const Users = require("../models/UsersModel");
const Networks = require("../models/NetworkModule");
const { Op } = require("sequelize");

const getCustomers = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 8;
  const offset = limit * page;

  try {
    let response;
    let totalRows;
    let totalPage;

    if (req.role === "admin") {
      totalRows = await Customers.count();
      totalPage = Math.ceil(totalRows / limit);

      response = await Customers.findAll({
        attributes: ["id", "uuid", "name", "email", "address", "phone"],
        include: [
          {
            model: Networks,
            attributes: ["uuid", "name"],
          },
        ],
        offset: offset,
        limit: limit,
        order: [["id", "DESC"]],
      });
    } else {
      response = await Customers.findAll({
        attributes: ["id", "uuid", "name", "email", "address", "phone"],
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

const getCustomerById = async (req, res) => {
  try {
    const customer = await Customers.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!customer) return res.status(404).json({ msg: "Data Not Found" });
    let response;
    if (req.role === "admin") {
      response = await Customers.findOne({
        attributes: ["uuid", "name", "email", "address", "phone", "createdAt"],
        where: {
          id: customer.id,
        },
        include: [
          {
            model: Networks,
            attributes: ["uuid", "name"],
          },
        ],
      });
    } else {
      response = await Customers.findOne({
        attributes: ["uuid", "name", "email", "address", "phone", "createdAt"],
        where: {
          [Op.and]: [{ id: customer.id }, { networkId: req.networkId }],
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

const getCustomersBasedOnNetwork = async (req, res) => {
  try {
    const response = await Customers.findAll({
      attributes: ["id", "uuid", "name", "email", "address", "phone"],
      where: {
        networkId: req.params.networkId,
      },
      include: [
        {
          model: Networks,
          attributes: ["uuid", "name"],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const createCustomer = async (req, res) => {
  const { name, email, address, phone, networkId } = req.body;
  try {
    if (req.role === "admin") {
      await Customers.create({
        name: name,
        email: email,
        address: address,
        phone: phone,

        networkId: networkId,
      });
      res.status(201).json({ msg: "Customer Added Successfuly" });
    } else {
      await Customers.create({
        name: name,
        email: email,
        address: address,
        phone: phone,

        networkId: req.networkId,
      });
      res.status(201).json({ msg: "Customer Added Successfuly" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const customer = await Customers.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!customer) return res.status(404).json({ msg: "Data Not Found" });
    const { name, email, address, phone } = req.body;
    if (req.role === "admin") {
      await Customers.update(
        { name, email, address, phone },
        {
          where: {
            id: customer.id,
          },
        }
      );
    } else {
      if (req.networkId !== customer.networkId)
        return res.status(403).json({ msg: "Access Forbidden" });
      await Customers.update(
        { name, email, address, phone },
        {
          where: {
            [Op.and]: [{ id: customer.id }, { networkId: req.networkId }],
          },
        }
      );
    }
    res.status(200).json({ msg: "Customer updated successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customers.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!customer) return res.status(404).json({ msg: "Data Not Found" });

    if (req.role === "admin") {
      await Customers.destroy({
        where: {
          id: customer.id,
        },
      });
    } else {
      if (req.networkId !== customer.networkId)
        return res.status(403).json({ msg: "Access Forbidden" });
      await Customers.destroy({
        where: {
          [Op.and]: [{ id: customer.id }, { networkId: req.networkId }],
        },
      });
    }
    res.status(200).json({ msg: "Customer deleted successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomersBasedOnNetwork,
};
