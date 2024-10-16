const bcrypt = require("bcrypt");
const Users = require("../models/UsersModel");
const Networks = require("../models/NetworkModule");

function encrypt(password) {
  return bcrypt.hash(password, 10);
}

const getUsers = async (req, res) => {
  try {
    const response = await Users.findAll({
      attributes: [
        "uuid",
        "fristname",
        "lastname",
        "username",
        "networkId",
        "role",
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

const getUserById = async (req, res) => {
  try {
    const response = await Users.findOne({
      attributes: [
        "uuid",
        "fristname",
        "lastname",
        "username",
        "networkId",
        "role",
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

const getUsersBasedOnNetwork = async (req, res) => {
  try {
    const response = await Users.findAll({
      attributes: [
        "uuid",
        "fristname",
        "lastname",
        "username",
        "networkId",
        "role",
      ],
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

const createUser = async (req, res) => {
  const {
    fristName,
    lastName,
    userName,
    password,
    confPassword,
    networkId,
    role,
  } = req.body;
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password and confirm password does not matched" });
  const hashPassword = await bcrypt.hash(password, 10);
  try {
    await Users.create({
      fristname: fristName,
      lastname: lastName,
      username: userName,
      password: hashPassword,
      networkId: networkId,
      role: role,
    });
    return res.status(201).json({ msg: "Success" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const updateUser = async (req, res) => {
  const user = await Users.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });
  const {
    fristName,
    lastName,
    userName,
    password,
    confPassword,
    networkId,
    role,
  } = req.body;
  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = user.password;
  } else {
    hashPassword = await bcrypt.hash(password, 10);
  }
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password and confirm password does not matched" });
  try {
    await Users.update(
      {
        fristname: fristName,
        lastname: lastName,
        username: userName,
        password: hashPassword,
        networkId: networkId,
        role: role,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.status(200).json({ msg: "User Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const deleteUser = async (req, res) => {
  const user = await Users.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });
  try {
    await Users.destroy({
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
  getUsers,
  getUserById,
  getUsersBasedOnNetwork,
  createUser,
  updateUser,
  deleteUser,
};
