const bcrypt = require("bcrypt");
const Users = require("../models/UsersModel");
const jwt = require("jsonwebtoken");

const Login = async (req, res) => {
  //console.log("Session before setting userId:", req.session);
  const user = await Users.findOne({
    where: {
      username: req.body.username,
    },
  });
  if (!user)
    return res.status(404).json({ msg: "Incorrect Username or Password" });
  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match)
    return res.status(400).json({ msg: "Incorrect Username or Password" });
  //req.session.userId = user.uuid;
  const token = jwt.sign({ userId: user.uuid }, "bdggewssdgfv", {
    expiresIn: 300,
  });

  const uuid = user.uuid;
  const name = `${user.fristname} ${user.lastname}`;
  const username = user.username;
  const networkId = user.networkId;
  const role = user.role;
  console.log("ses id ", req.session);
  res.status(200).json({ uuid, name, username, networkId, role, token });
};

const Me = async (req, res) => {
  //console.log("ses id -- ", req.session);
  if (!req.userId) {
    return res.status(401).json({ msg: "Please login to your account" });
  }
  const user = await Users.findOne({
    attributes: [
      "uuid",
      "fristname",
      "lastname",
      "username",
      "networkId",
      "role",
    ],
    where: {
      uuid: req.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });
  res.status(200).json(user);
};

const logOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "Cannot logout" });
    res.status(200).json({ msg: "You have logout" });
  });
};

module.exports = {
  Login,
  logOut,
  Me,
};
