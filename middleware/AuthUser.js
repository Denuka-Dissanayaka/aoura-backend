const Users = require("../models/UsersModel");

const verifyUser = async (req, res, next) => {
  if (!req.user_Id) {
    return res.status(401).json({ msg: "Please login to your account" });
  }
  const user = await Users.findOne({
    where: {
      uuid: req.user_Id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });
  req.userId = user.id;
  req.role = user.role;
  req.networkId = user.networkId;
  next();
};

const adminOnly = async (req, res, next) => {
  const user = await Users.findOne({
    where: {
      uuid: req.user_Id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });
  if (user.role !== "admin")
    return res.status(403).json({ msg: "Access only for Admin" });
  next();
};

module.exports = {
  verifyUser,
  adminOnly,
};
