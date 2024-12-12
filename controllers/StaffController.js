const bcrypt = require("bcrypt");
const Staffs = require("../models/StaffModule");
const Networks = require("../models/NetworkModule");
const { Op } = require("sequelize");

function encrypt(password) {
  return bcrypt.hash(password, 10);
}

const getStaffs = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 8;
  const offset = limit * page;
  try {
    let totalRows;
    let totalPage;
    totalRows = await Staffs.count();
    totalPage = Math.ceil(totalRows / limit);

    const response = await Staffs.findAll({
      attributes: [
        "id",
        "uuid",
        "fristname",
        "lastname",
        "gender",
        "networkId",
        "nic",
      ],
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

const getStaffsCount = async (req, res) => {
  let response;
  if (req.role === "admin") {
    response = await Staffs.count();
  } else {
    response = 0;
  }
  res.status(200).json({
    response,
  });
};

const getStaffById = async (req, res) => {
  try {
    const response = await Staffs.findOne({
      attributes: [
        "uuid",
        "fristname",
        "lastname",
        "nic",
        "gender",
        "networkId",
        "createdAt",
      ],
      include: [
        {
          model: Networks,
          attributes: ["uuid", "name"],
        },
      ],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const getStaffsBasedOnNetwork = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 8;
  const searchByName = req.query.search_by_name || "";
  const offset = limit * page;
  try {
    let totalRows;
    let totalPage;
    totalRows = await Staffs.count({
      where: {
        [Op.and]: [
          {
            fristname: {
              [Op.like]: "%" + searchByName + "%",
            },
          },
          {
            networkId: req.params.networkId,
          },
        ],
        //networkId: req.params.networkId,
      },
    });
    totalPage = Math.ceil(totalRows / limit);

    const response = await Staffs.findAll({
      attributes: [
        "id",
        "uuid",
        "fristname",
        "lastname",
        "gender",
        "networkId",
        "nic",
      ],
      where: {
        [Op.and]: [
          {
            fristname: {
              [Op.like]: "%" + searchByName + "%",
            },
          },
          {
            networkId: req.params.networkId,
          },
        ],
        //networkId: req.params.networkId,
      },
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

const createStaff = async (req, res) => {
  const {
    fristName,
    lastName,
    gender,
    nic,

    networkId,
  } = req.body;

  try {
    await Staffs.create({
      fristname: fristName,
      lastname: lastName,
      gender: gender,
      nic: nic,
      networkId: networkId,
    });
    return res.status(201).json({ msg: "Success" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const updateStaff = async (req, res) => {
  const staff = await Staffs.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!staff) return res.status(404).json({ msg: "Staff not found" });
  const { fristName, lastName, gender, nic } = req.body;

  try {
    await Staffs.update(
      {
        fristname: fristName,
        lastname: lastName,
        gender: gender,
        nic: nic,
      },
      {
        where: {
          id: staff.id,
        },
      }
    );
    res.status(200).json({ msg: "Staff Member Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const deleteStaff = async (req, res) => {
  const user = await Staffs.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });
  try {
    await Staffs.destroy({
      where: {
        id: user.id,
      },
    });
    res.status(200).json({ msg: "User Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = {
  getStaffs,
  getStaffById,
  getStaffsBasedOnNetwork,
  createStaff,
  updateStaff,
  deleteStaff,
  getStaffsCount,
};
