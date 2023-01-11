const jwt = require("jsonwebtoken");
require('dotenv').config();

const authorizedMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    res.status(401).json({
      status: "error",
      code: "code_error",
      message: "Token not found!",
    });
    return false;
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      res.status(403).json({
        status: "error",
        code: "code_verify_error",
        message: "Your token is invalid!",
      });
      return false;
    }
    next();
  });
};

module.exports = authorizedMiddleware;
