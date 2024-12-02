const Products = require("../models/ProductModel");
const Users = require("../models/UsersModel");
const Networks = require("../models/NetworkModule");
const { Op } = require("sequelize");

const getProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 8;
  //const search = req.query.search_query || "";
  const offset = limit * page;
  try {
    let response;
    let totalRows;
    let totalPage;
    if (req.role === "admin") {
      totalRows = await Products.count();
      totalPage = Math.ceil(totalRows / limit);

      response = await Products.findAll({
        attributes: ["uuid", "name", "quantity", "price", "type", "id"],
        include: [
          {
            model: Users,
            attributes: ["fristname", "lastname"],
          },
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
      response = await Products.findAll({
        attributes: ["uuid", "name", "quantity", "price", "type", "id"],
        where: {
          networkId: req.networkId,
        },
        include: [
          {
            model: Users,
            attributes: ["fristname", "lastname"],
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

const getProductsCount = async (req, res) => {
  let response;
  if (req.role === "admin") {
    response = await Products.count();
  } else {
    response = 0;
  }
  res.status(200).json({
    response,
  });
};

const getProductById = async (req, res) => {
  try {
    const product = await Products.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!product) return res.status(404).json({ msg: "Data Not Found" });
    let response;
    if (req.role === "admin") {
      response = await Products.findOne({
        attributes: ["uuid", "name", "quantity", "price", "type"],
        where: {
          id: product.id,
        },
        include: [
          {
            model: Users,
            attributes: ["fristname", "lastname"],
          },
          {
            model: Networks,
            attributes: ["uuid", "name"],
          },
        ],
      });
    } else {
      response = await Products.findOne({
        attributes: ["uuid", "name", "quantity", "price", "type"],
        where: {
          [Op.and]: [{ id: product.id }, { networkId: req.networkId }],
        },
        include: [
          {
            model: Users,
            attributes: ["fristname", "lastname"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getProductByIdForPrice = async (req, res) => {
  try {
    const product = await Products.findOne({
      where: {
        id: req.params.productId,
      },
    });
    if (!product) return res.status(404).json({ msg: "Data Not Found" });
    let response;
    if (req.role === "admin") {
      response = await Products.findOne({
        attributes: ["uuid", "name", "quantity", "price", "type"],
        where: {
          id: product.id,
        },
      });
    } else {
      response = await Products.findOne({
        attributes: ["uuid", "name", "quantity", "price", "type"],
        where: {
          [Op.and]: [{ id: product.id }, { networkId: req.networkId }],
        },
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getProductsBasedOnNetwork = async (req, res) => {
  try {
    const response = await Products.findAll({
      attributes: ["id", "uuid", "name", "quantity", "price", "type"],
      where: {
        networkId: req.params.networkId,
      },
      include: [
        {
          model: Users,
          attributes: ["fristname", "lastname"],
        },
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

const createProduct = async (req, res) => {
  const { name, price, quantity, networkId, type } = req.body;
  try {
    if (req.role === "admin") {
      await Products.create({
        name: name,
        price: price,
        quantity: quantity,
        type: type,
        userId: req.userId,
        networkId: networkId,
      });
      res.status(201).json({ msg: "Product or Package Created Successfuly" });
    } else {
      await Products.create({
        name: name,
        price: price,
        quantity: quantity,
        type: type,
        userId: req.userId,
        networkId: req.networkId,
      });
      res.status(201).json({ msg: "Product or Package Created Successfuly" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Products.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!product) return res.status(404).json({ msg: "Data Not Found" });
    const { name, price, quantity } = req.body;
    if (req.role === "admin") {
      await Products.update(
        { name, price, quantity },
        {
          where: {
            id: product.id,
          },
        }
      );
    } else {
      if (req.networkId !== product.networkId)
        return res.status(403).json({ msg: "Access Forbidden" });
      await Products.update(
        { name, price, quantity },
        {
          where: {
            [Op.and]: [{ id: product.id }, { networkId: req.networkId }],
          },
        }
      );
    }
    res.status(200).json({ msg: "Product updated successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Products.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!product) return res.status(404).json({ msg: "Data Not Found" });

    if (req.role === "admin") {
      await Products.destroy({
        where: {
          id: product.id,
        },
      });
    } else {
      if (req.networkId !== product.networkId)
        return res.status(403).json({ msg: "Access Forbidden" });
      await Products.destroy({
        where: {
          [Op.and]: [{ id: product.id }, { networkId: req.networkId }],
        },
      });
    }
    res.status(200).json({ msg: "Product deleted successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsBasedOnNetwork,
  getProductByIdForPrice,
  getProductsCount,
};
