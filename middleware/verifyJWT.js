const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const token = req.headers["access-token"];

  if (!token) {
    return res.status(401).json({ msg: "Please login to your account" });
  } else {
    jwt.verify(token, "bdggewssdgfv", (err, decoded) => {
      if (err) {
        return res.status(401).json({ msg: "invalid token" });
      } else {
        req.user_Id = decoded.userId;
        next();
      }
    });
  }
};

module.exports = verifyJWT;
