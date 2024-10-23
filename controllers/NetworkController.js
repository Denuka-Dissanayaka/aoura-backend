const Networks = require("../models/NetworkModule");

const getNetworks = async (req, res) => {
  try {
    const response = await Networks.findAll({
      attributes: ["id", "uuid", "name"],
    });
    res.status(200).json(response);
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
  const { networkName } = req.body;

  try {
    await Networks.create({
      name: networkName,
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
  getNetworkById,
  createNetworks,
  updateNetwork,
  deleteNetwork,
};
