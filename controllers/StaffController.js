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

// const getUserById = async (req, res) => {
//   try {
//     const response = await Users.findOne({
//       attributes: [
//         "uuid",
//         "fristname",
//         "lastname",
//         "username",
//         "networkId",
//         "role",
//       ],
//       include: [
//         {
//           model: Networks,
//           attributes: ["uuid", "name"],
//         },
//       ],
//       where: {
//         uuid: req.params.id,
//       },
//     });
//     res.status(200).json(response);
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// };

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

// const updateUser = async (req, res) => {
//   const user = await Users.findOne({
//     where: {
//       uuid: req.params.id,
//     },
//   });
//   if (!user) return res.status(404).json({ msg: "User not found" });
//   const {
//     fristName,
//     lastName,
//     userName,
//     password,
//     confPassword,
//     networkId,
//     role,
//   } = req.body;
//   let hashPassword;
//   if (password === "" || password === null) {
//     hashPassword = user.password;
//   } else {
//     hashPassword = await bcrypt.hash(password, 10);
//   }
//   if (password !== confPassword)
//     return res
//       .status(400)
//       .json({ msg: "Password and confirm password does not matched" });
//   try {
//     await Users.update(
//       {
//         fristname: fristName,
//         lastname: lastName,
//         username: userName,
//         password: hashPassword,
//         networkId: networkId,
//         role: role,
//       },
//       {
//         where: {
//           id: user.id,
//         },
//       }
//     );
//     res.status(200).json({ msg: "User Updated" });
//   } catch (error) {
//     res.status(400).json({ msg: error.message });
//   }
// };

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
  //getUserById,
  createStaff,
  //updateUser,
  deleteStaff,
};
