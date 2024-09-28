const bcrypt = require("bcrypt");
const Staffs = require("../models/StaffModule");
const Networks = require("../models/NetworkModule");

function encrypt(password) {
  return bcrypt.hash(password, 10);
}

const getStaffs = async (req, res) => {
  try {
    const response = await Staffs.findAll({
      attributes: [
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
    });
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
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
        fristName: fristName,
        lastName: lastName,
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
  createStaff,
  updateStaff,
  deleteStaff,
};
