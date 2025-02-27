const Networks = require("../models/NetworkModule");
const { Op } = require("sequelize");

const getNetworks = async (req, res) => {
  try {
    const response = await Networks.findAll({
      attributes: ["id", "uuid", "name"],
      where: {
        status: "active",
      },
    });
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const getNetworks2 = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 8;
  const searchByName = req.query.search_by_name || "";
  const offset = limit * page;
  try {
    let totalRows;
    let totalPage;
    totalRows = await Networks.count({
      where: {
        status: "active",
        [Op.or]: [
          {
            name: {
              [Op.like]: "%" + searchByName + "%",
            },
          },
        ],
      },
    });
    totalPage = Math.ceil(totalRows / limit);

    const response = await Networks.findAll({
      attributes: ["id", "uuid", "name"],
      where: {
        status: "active",
        [Op.or]: [
          {
            name: {
              [Op.like]: "%" + searchByName + "%",
            },
          },
        ],
      },
      offset: offset,
      limit: limit,
      order: [["id", "DESC"]],
    });
    res.status(200).json({
      response,
      page: page,
      limit: limit,
      totalRows: totalRows,
      totalPage: totalPage,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const getNetworkById = async (req, res) => {
  try {
    const response = await Networks.findOne({
      attributes: ["uuid", "name", "createdAt"],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const createNetworks = async (req, res) => {
  const { networkName, type } = req.body;

  try {
    await Networks.create({
      name: networkName,
      type: type,
    });
    return res.status(201).json({ msg: "Success" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const updateNetwork = async (req, res) => {
  const network = await Networks.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!network) return res.status(404).json({ msg: "Network not found" });
  const { networkName } = req.body;

  try {
    await Networks.update(
      {
        name: networkName,
      },
      {
        where: {
          id: network.id,
        },
      }
    );
    res.status(200).json({ msg: "Network Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const deleteNetwork = async (req, res) => {
  const network = await Networks.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!network) return res.status(404).json({ msg: "Network not found" });
  try {
    await Networks.destroy({
      where: {
        id: network.id,
      },
    });
    res.status(200).json({ msg: "Network Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = {
  getNetworks,
  getNetworks2,
  getNetworkById,
  createNetworks,
  updateNetwork,
  deleteNetwork,
};
